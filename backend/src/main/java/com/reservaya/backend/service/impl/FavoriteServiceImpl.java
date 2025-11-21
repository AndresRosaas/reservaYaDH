package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.entity.User;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.ProductMapper;
import com.reservaya.backend.repository.IProductRepository;
import com.reservaya.backend.repository.IUserRepository;
import com.reservaya.backend.service.IFavoriteService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriteServiceImpl implements IFavoriteService {
    private final IProductRepository productRepository;
    private final IUserRepository userRepository;
    private final ProductMapper productMapper;

    public FavoriteServiceImpl(IProductRepository productRepository, IUserRepository userRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productMapper = productMapper;
    }

    @Override
    public void addFavorite(Long userId, Long productId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException
                        ("Usuario no encontrado con ID: " + userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException
                        ("Producto no encontrado con ID: " + userId));

        user.getFavoriteProduct().add(product);
        userRepository.save(user);
    }
    @Override
    public void removeFavorite(Long userId, Long productId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException
                        ("Usuario no encontrado con ID: " + userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException
                        ("Producto no encontrado con ID: " + userId));

        user.getFavoriteProduct().remove(product);
        userRepository.save(user);
    }
    @Override
    public List<ProductDTO> getUserFavorites(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Usuario no encontrado con ID: " + userId));
        List<Product> favorites = new ArrayList<>(user.getFavoriteProduct());
        return productMapper.toDTOList(favorites);
    }
    @Override
    public boolean isFavorite(Long userId, Long productId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("Usuario no encontrado con ID: " + userId));

        return user.getFavoriteProduct().stream()
                .anyMatch(p-> p.getId().equals(productId));
    }


}
