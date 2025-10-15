package com.reservaya.backend.enums;

public enum ReservationStatus {
        PENDING, //Pendiente, sin confirmar
        CONFIRMED, //Confirmada, sin abonar
        CANCELLED, //Cancelada
        COMPLETED //Confirmada y abonada
}
