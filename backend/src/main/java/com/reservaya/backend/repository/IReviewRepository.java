package com.reservaya.backend.repository;

import com.reservaya.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
    List<Review> findByUserId(Long userId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);
    Optional<Review> findByUserIdAndProductId(Long userId, Long productId);
}
