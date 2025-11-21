package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.ReviewDTO;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.entity.Review;
import com.reservaya.backend.entity.User;
import com.reservaya.backend.enums.ReservationStatus;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.ReviewMapper;
import com.reservaya.backend.repository.IProductRepository;
import com.reservaya.backend.repository.IReservationRepository;
import com.reservaya.backend.repository.IReviewRepository;
import com.reservaya.backend.repository.IUserRepository;
import com.reservaya.backend.service.IReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements IReviewService {
    private final IReviewRepository reviewRepository;
    private final IProductRepository productRepository;
    private final IUserRepository userRepository;
    private final IReservationRepository reservationRepository;
    private final ReviewMapper reviewMapper;

    public ReviewServiceImpl(IReviewRepository reviewRepository,
                             IProductRepository productRepository,
                             IUserRepository userRepository,
                             IReservationRepository reservationRepository,
                             ReviewMapper reviewMapper) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.reviewMapper = reviewMapper;
    }

    @Override
    public ReviewDTO createReview (Long userId, ReviewDTO reviewDTO){
        //Busco usuario
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Usuario no encontrado con ID: " + userId
                ));
        //Busco producto
        Product product = productRepository.findById(reviewDTO.getProductId())
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Producto no encontrado"
                ));

        //Verifico que la reserva este COMPLETED
        boolean hasCompletedReservation = reservationRepository.existsByUserIdAndProductIdAndStatus(
                userId,
                reviewDTO.getProductId(),
                ReservationStatus.COMPLETED
        );
        if (!hasCompletedReservation){
            throw new IllegalStateException(
                    "Para dejar una reseña primero debes reservar y completar la compra del producto."
            );
        }
        //Verifico que no exista review previa
        if (reviewRepository.existsByUserIdAndProductId(userId, reviewDTO.getProductId())){
            throw new IllegalStateException(
                    "Ya calificaste este producto"
            );
        }
        //Creo la review
        Review review = reviewMapper.toEntity(reviewDTO);
        review.setUser(user);
        review.setProduct(product);

        Review saved = reviewRepository.save(review);

        return reviewMapper.toDTO(saved);
    }
    @Override
    public List<ReviewDTO> getProductsReview(Long productId){
        if (!productRepository.existsById(productId)){
            throw new ResourceNotFoundException("Producto no encontrado");
            }
        //busco reviews
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviewMapper.toDTOList(reviews);
    }
    @Override
    public List<ReviewDTO> getUserReview(Long userId){
        if (!userRepository.existsById(userId)){
            throw new ResourceNotFoundException("Usuario no encontrado");
        }
        List<Review> reviews = reviewRepository.findByUserId(userId);
        return reviewMapper.toDTOList(reviews);
    }
    @Override
    public void deleteReview(Long reviewId, Long userId){
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()-> new ResourceNotFoundException("Review no encontrada"));
        if (!review.getUser().getId().equals(userId)){
            throw new IllegalStateException("Solo podes eliminar tus propias reviws");
            }
        reviewRepository.deleteById(reviewId);
    }
    @Override
    public Double getAverageRating(Long productId){
        List<Review> reviews = reviewRepository.findByProductId(productId);

        if (reviews.isEmpty()){
            return 0.0;
        }
        double sum = reviews.stream()
                .mapToInt(Review::getRating)
                .sum();
        return sum/reviews.size();
    }
}
