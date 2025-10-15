package com.reservaya.backend.repository;

import com.reservaya.backend.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    @Query("SELECT r FROM Reservation r WHERE r.product.id = :productId " +
            "AND r.status != 'CANCELLED' " +
            "AND ((r.startDate <= :endDate) AND (r.endDate >= :startDate))")//me aseguro de que no se solapen las reservas
    List<Reservation> findByProductAndDateRange(
            @Param("productId") Long productId,
            @Param("startDate")LocalDate startDate,
            @Param("endDate") LocalDate endDate
            );
}
