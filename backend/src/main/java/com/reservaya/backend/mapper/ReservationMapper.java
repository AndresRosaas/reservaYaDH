package com.reservaya.backend.mapper;

import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.dto.ReservationDTO;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.entity.Reservation;
import com.reservaya.backend.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReservationMapper {
    //Entity to DTO
    public ReservationDTO toDTO(Reservation reservation){
        if(reservation == null) return null;

        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setStartDate(reservation.getStartDate());
        dto.setEndDate(reservation.getEndDate());
        dto.setStatus(reservation.getStatus());
        dto.setReservationDate(reservation.getReservationDate());

        if(reservation.getUser() != null){
            User user = reservation.getUser();
            dto.setUserId(user.getId());
            dto.setUserName(user.getFirstName());
            dto.setUserEmail(user.getEmail());}



        if(reservation.getProduct()!= null){
            Product product = reservation.getProduct();
            dto.setProductId(product.getId());
            dto.setProductName(product.getName());

            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setDescription(product.getDescription());
            productDTO.setPrice(product.getPrice());
            productDTO.setCurrency(product.getCurrency());
            dto.setProduct(productDTO);
        }

        return dto;

    }
    //DTO a entity
    public Reservation toEntity(ReservationDTO dto){
        if(dto == null) return null;

        Reservation reservation = new Reservation();
        reservation.setId(dto.getId());
        reservation.setStartDate(dto.getStartDate());
        reservation.setEndDate(dto.getEndDate());
        reservation.setReservationDate(dto.getReservationDate());
        reservation.setStatus(dto.getStatus());

        if(dto.getUserId() != null){
            User user = new User();
            user.setId(dto.getUserId());
            reservation.setUser(user);
        }

        if(dto.getProductId() != null){
            Product product = new Product();
            product.setId(dto.getProductId());
            reservation.setProduct(product);
        }
        return reservation;


    }
    public List<ReservationDTO> toDTOList(List<Reservation> reservations){
        List<ReservationDTO> reservationDTOS = new ArrayList<>();

        for (Reservation reservation : reservations){
            reservationDTOS.add((toDTO(reservation)));

        }return reservationDTOS;
    }
}
