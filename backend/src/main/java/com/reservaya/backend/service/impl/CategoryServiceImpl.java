package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.CategoryDTO;
import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.entity.Category;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.CategoryMapper;
import com.reservaya.backend.repository.ICategoryRepository;
import com.reservaya.backend.service.ICategoryService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@Service
public class CategoryServiceImpl implements ICategoryService {

    private final ICategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(ICategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    //Guardo la categoria creada
    @Override
    public CategoryDTO save(CategoryDTO categoryDTO){
        Category category = categoryMapper.toEntity(categoryDTO);
        Category saved = categoryRepository.save(category);
        return categoryMapper.toDTO(saved);
    }

    //Busco la categoria
    @Override
    public Optional<CategoryDTO> findById(Long id) throws ResourceNotFoundException {
        Optional<Category> categoryDTO = categoryRepository.findById(id);
        return categoryDTO.map(categoryMapper::toDTO);
    }

    //Borrar
    @Override
    public void delete(Long id) throws ResourceNotFoundException{
        if(!categoryRepository.existsById(id)){
            throw new ResourceNotFoundException("NO se encontro la categoria con ID: " + id);
        }categoryRepository.deleteById(id);
        }
    @Override
    public List<CategoryDTO> findAll(){
        List<Category> categoryDTOS = categoryRepository.findAll();
        return categoryMapper.toDTOList(categoryDTOS);

    }
    @Override
    public CategoryDTO update(Long id, CategoryDTO categoryDTO){
        Category categoryExist = categoryRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException(
                        "Categoria no encontrada con ID: " + id
                ));

        categoryExist.setName(categoryDTO.getName());
        categoryExist.setDescription(categoryDTO.getDescription());

        Category updated = categoryRepository.save(categoryExist);
        return categoryMapper.toDTO(updated);
    }
}
