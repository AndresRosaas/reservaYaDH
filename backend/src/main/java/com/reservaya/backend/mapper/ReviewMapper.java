package com.reservaya.backend.mapper;

import com.reservaya.backend.dto.ReviewDTO;
import com.reservaya.backend.entity.Review;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReviewMapper {
    //Entity a DTO
    public ReviewDTO toDTO(Review review){
        if(review == null) return null;

        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());

        if(review.getUser() != null){
            dto.setUserId(review.getUser().getId());
            dto.setUserName(review.getUser().getFirstName() + " "+ review.getUser().getLastName());
            }
        if (review.getProduct() != null){
            dto.setProductId(review.getProduct().getId());
            dto.setProductName(review.getProduct().getName());
        }
        return dto;


    }
    //DTO a entity
    public Review toEntity(ReviewDTO dto){
        if(dto == null) return null;
        Review review = new Review();
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        return review;
    }
    public List<ReviewDTO> toDTOList(List<Review> reviews){
        List<ReviewDTO> dtos = new ArrayList<>();
        for (Review review : reviews){
            dtos.add(toDTO(review));
        }
        return dtos;
    }
}
