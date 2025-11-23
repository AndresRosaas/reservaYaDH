package com.reservaya.backend.service;

import com.reservaya.backend.dto.ReservationDTO;
import com.reservaya.backend.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IReservationService {
    //Hago la reserva
    ReservationDTO save(ReservationDTO reservationDTO);
    //Busco la reserva para ver el detalle
    Optional<ReservationDTO> findById(Long id) throws ResourceNotFoundException;
    //Listo reservas por usuario
    List<ReservationDTO> findByUserId(Long userId);
    //Listo reserva por producto por fechas
    List<ReservationDTO> findByProductAndDateRange(Long productId, LocalDate startDate, LocalDate endDate);
    //Elimino la reserva
    void cancel(Long id) throws ResourceNotFoundException;

}
