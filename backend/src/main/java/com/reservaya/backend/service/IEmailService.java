package com.reservaya.backend.service;

import com.reservaya.backend.dto.ReservationDTO;
import com.reservaya.backend.dto.UserDTO;

public interface IEmailService {
    void sendWelcomeEmail(UserDTO user);
    void sendReservationConfirmation(ReservationDTO reservationDTO);
}
