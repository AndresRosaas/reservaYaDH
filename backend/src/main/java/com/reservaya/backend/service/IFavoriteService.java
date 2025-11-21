package com.reservaya.backend.service;

import com.reservaya.backend.dto.ProductDTO;

import java.util.List;

public interface IFavoriteService {
    void addFavorite(Long userId, Long productId);
    void removeFavorite(Long userId, Long productId);
    List<ProductDTO> getUserFavorites(Long userId);
    boolean isFavorite (Long userId, Long productId);
}
