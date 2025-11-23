package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.ReservationDTO;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.entity.Reservation;
import com.reservaya.backend.entity.User;
import com.reservaya.backend.enums.ReservationStatus;
import com.reservaya.backend.exception.BadRequestException;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.ReservationMapper;
import com.reservaya.backend.repository.IProductRepository;
import com.reservaya.backend.repository.IReservationRepository;
import com.reservaya.backend.repository.IUserRepository;
import com.reservaya.backend.service.IEmailService;
import com.reservaya.backend.service.IReservationService;
import io.micrometer.observation.annotation.Observed;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements IReservationService {
    private final IReservationRepository reservationRepository;
    private final IProductRepository productRepository;
    private final IUserRepository userRepository;
    private final ReservationMapper reservationMapper;
    private final IEmailService emailService;

    public ReservationServiceImpl(IReservationRepository reservationRepository,
                                  IProductRepository productRepository,
                                  IUserRepository userRepository,
                                  ReservationMapper reservationMapper,
                                  IEmailService emailService
                                  ) {
        this.reservationRepository = reservationRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reservationMapper = reservationMapper;
        this.emailService = emailService;
    }

    @Override
    public ReservationDTO save(ReservationDTO reservationDTO) {

        //me fijo que la fecha de inicio no sea mayor a la de fin
        if (reservationDTO.getStartDate().isAfter(reservationDTO.getEndDate())) {
            throw new BadRequestException("La fecha de fin tiene que ser mas grande que la de inicio");
        }
        if (reservationDTO.getStartDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("La fecha de inicio tiene que ser mas grande que el dia actual");
        }

        Product product = productRepository.findById(reservationDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con Id: " + reservationDTO.getProductId()
                ));
        User user = userRepository.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario no encontrado co Id: " + reservationDTO.getUserId()
                ));
        List<Reservation> reservations = reservationRepository.findByProductAndDateRange(
                reservationDTO.getProductId(),
                reservationDTO.getStartDate(),
                reservationDTO.getEndDate()
        );
        if (!reservations.isEmpty()) {
            throw new BadRequestException("Las fechas seleccionadas se encuentran ocupadas.");
        }
        Long days = ChronoUnit.DAYS.between(
                reservationDTO.getStartDate(),
                reservationDTO.getEndDate()
        );

        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(days));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setProduct(product);
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.setReservationDate(LocalDateTime.now());
        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservation.setTotalPrice(totalPrice);
        reservation.setCurrency(product.getCurrency());

        Reservation saved = reservationRepository.save(reservation);
        ReservationDTO savedDTO = reservationMapper.toDTO(saved);

        emailService.sendReservationConfirmation(savedDTO);

        return savedDTO;
    }

    @Override
    public Optional<ReservationDTO> findById(Long id) throws ResourceNotFoundException{
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        return reservationOptional.map(reservationMapper::toDTO);
    }
    @Override
    public List<ReservationDTO> findByUserId(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return reservations.stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReservationDTO> findByProductAndDateRange(Long productId, LocalDate startDate, LocalDate endDate){
        List<Reservation> reservations = reservationRepository.findByProductAndDateRange(productId, startDate, endDate);
        return reservations.stream()
                .map(reservationMapper::toDTO)
                .collect(Collectors.toList());
    }
    @Override
    public void cancel(Long id) throws ResourceNotFoundException{
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con Id: " + id) );
                reservation.setStatus(ReservationStatus.CANCELLED);
                reservationRepository.save(reservation);
    }
}
