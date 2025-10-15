package com.reservaya.backend.mapper;

import com.reservaya.backend.dto.CategoryDTO;
import com.reservaya.backend.entity.Category;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoryMapper {
    //Entity a DTO
    public CategoryDTO toDTO(Category category){
        if(category==null) return null;

        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());

        return dto;
    }
    //DTO a Entity
    public Category toEntity(CategoryDTO categoryDTO){
        if(categoryDTO == null ) return null;

        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        return category;
    }
    public List<CategoryDTO> toDTOList(List<Category> categories){
        List<CategoryDTO> categoryDTOS = new ArrayList<>();

        for(Category category : categories){
            categoryDTOS.add(toDTO(category));
        }
        return categoryDTOS;
    }

}
