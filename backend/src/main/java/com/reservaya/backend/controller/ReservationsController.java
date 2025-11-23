package com.reservaya.backend.controller;

import com.reservaya.backend.dto.ReservationDTO;
import com.reservaya.backend.service.IReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationsController {
    private final IReservationService reservationService;

    public ReservationsController(IReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> save (@Valid @RequestBody ReservationDTO reservationDTO){
        ReservationDTO saved = reservationService.save(reservationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> findById(@PathVariable Long id){
        Optional<ReservationDTO> reservationDTO = reservationService.findById(id);
        return reservationDTO.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("user/{userId}")
    public ResponseEntity<List<ReservationDTO>> findByUserId(@PathVariable Long userId){
        List<ReservationDTO> reservationDTOS = reservationService.findByUserId(userId);
        return ResponseEntity.ok(reservationDTOS);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id) throws RuntimeException{
        reservationService.cancel(id);
        return ResponseEntity.noContent().build();
    }
}
