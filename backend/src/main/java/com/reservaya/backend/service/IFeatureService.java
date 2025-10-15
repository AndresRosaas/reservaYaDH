package com.reservaya.backend.service;

import com.reservaya.backend.dto.CategoryDTO;
import com.reservaya.backend.dto.FeatureDTO;
import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IFeatureService {
    FeatureDTO save(FeatureDTO featureDTO);
    FeatureDTO update(FeatureDTO featureDTO);
    void delete(Long id)throws ResourceNotFoundException;
    List<FeatureDTO> findAll();
    Optional<FeatureDTO> findById(Long id) throws ResourceNotFoundException;
}
