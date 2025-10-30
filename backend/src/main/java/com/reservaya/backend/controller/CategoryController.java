package com.reservaya.backend.controller;

import com.reservaya.backend.dto.CategoryDTO;
import com.reservaya.backend.entity.Category;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAll(){return ResponseEntity.ok(categoryService.findAll());}

    @PostMapping //Solo admin
    public ResponseEntity<CategoryDTO> save(@RequestBody CategoryDTO categoryDTO){
        CategoryDTO saved = categoryService.save(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);}

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<CategoryDTO> categoryFind = categoryService.findById(id);

        if (categoryFind.isPresent()){
            return ResponseEntity.ok(categoryFind.get());
        }else {
            return ResponseEntity.notFound().build();
        }

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        categoryService.delete(id);
        return ResponseEntity.ok("Se elimino la categoria con ID: " + id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody CategoryDTO dto){
        CategoryDTO updated = categoryService.update(id, dto);
        return ResponseEntity.noContent().build();
    }
}
