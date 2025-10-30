package com.reservaya.backend.service;

import com.reservaya.backend.dto.CategoryDTO;
import com.reservaya.backend.entity.Category;
import com.reservaya.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    //Guardo la categoria
    CategoryDTO save(CategoryDTO categoryDTO);
    //Busco la categoria
    Optional<CategoryDTO> findById (Long id) throws ResourceNotFoundException;
    //Actualizo la categoria
    CategoryDTO update (Long id, CategoryDTO categoryDTO);
    //Borro la categoria
    void delete (Long id) throws ResourceNotFoundException;
    //Busco todas
    List<CategoryDTO> findAll();

}
