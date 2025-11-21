package com.reservaya.backend.controller;

import com.reservaya.backend.dto.ReviewDTO;
import com.reservaya.backend.service.IReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final IReviewService reviewService;

    public ReviewController(IReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(
            @RequestParam Long userId,
            @Valid @RequestBody ReviewDTO reviewDTO
    ){
        ReviewDTO created = reviewService.createReview(userId, reviewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    //Lista de reviews de un producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDTO>> getProductReviews(@PathVariable Long productId){
        List<ReviewDTO> reviews = reviewService.getProductsReview(productId);
        return ResponseEntity.ok(reviews);
    }

    //Listas de reviews de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable Long userId){
        List<ReviewDTO> reviews = reviewService.getUserReview(userId);
        return ResponseEntity.ok(reviews);
    }
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId,
            @RequestParam Long userId
    ){
        reviewService.deleteReview(reviewId, userId);
        return ResponseEntity.noContent().build();
    }
}
