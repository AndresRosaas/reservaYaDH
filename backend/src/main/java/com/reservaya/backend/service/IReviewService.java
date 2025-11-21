package com.reservaya.backend.service;

import com.reservaya.backend.dto.ReviewDTO;

import java.util.List;

public interface IReviewService {

    ReviewDTO createReview (Long userId, ReviewDTO reviewDTO);
    List<ReviewDTO> getProductsReview(Long productId);
    List<ReviewDTO> getUserReview (Long userId);
    void deleteReview(Long reviewId, Long userId); //Esto va a ser solo para admins
    Double getAverageRating(Long productId);
}
