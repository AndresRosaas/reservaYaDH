package com.reservaya.backend.controller;

import com.reservaya.backend.dto.DateRangeDTO;
import com.reservaya.backend.dto.ProductAvailabilityDTO;
import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.dto.ProductSearchDTO;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.service.IProductService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }


    @GetMapping("/random")
    public ResponseEntity<List<ProductDTO>> findRandom(@RequestParam(defaultValue = "10") int limit) {
        List<ProductDTO> products = productService.findRandom(limit);
        return ResponseEntity.ok(products);
    }

    //@GetMapping("/paginated")

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<ProductDTO> productToLook = productService.findById(id);
        return productToLook.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductDTO> save(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO saved = productService.save(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@Valid @PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO productUpdate = productService.update(id, productDTO);
        return ResponseEntity.ok(productUpdate);

    }

    @PutMapping("/{productId}/category/{categoryId}")
    public ResponseEntity<ProductDTO> assignCategory(@Valid @PathVariable Long productId, @PathVariable Long categoryID) {
        ProductDTO updated = productService.assignCategory(productId, categoryID);
        return ResponseEntity.ok(updated);
    }

    //sumar feature - ADMIN
    @PostMapping("/{productId}/features/{featureId}")
    public ResponseEntity<ProductDTO> addFeature(@Valid @PathVariable Long productId, @PathVariable Long featureId) {
        ProductDTO updated = productService.addFeature(productId, featureId);
        return ResponseEntity.ok(updated);
    }

    //quitar feature - ADMIN
    @DeleteMapping("/{productId}/features/{featureId}")
    public ResponseEntity<ProductDTO> removeFeature(@PathVariable Long productId, @PathVariable Long featureId) {
        ProductDTO deleted = productService.removeFeature(productId, featureId);
        return ResponseEntity.ok(deleted);
    }

    //filtrar por categoria
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getByCategory(@PathVariable Long categoryId) {
        List<ProductDTO> productDTOS = productService.findCategoryById(categoryId);
        return ResponseEntity.ok(productDTOS);
    }

    //disponibilidad del producto
    @GetMapping("/{id}/availability")
    public ResponseEntity<ProductAvailabilityDTO> getAvailability(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        ProductAvailabilityDTO availabilityDTO = productService.getAvailability(id, startDate, endDate);
        return ResponseEntity.ok(availabilityDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchAvailableProducts(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,

            @RequestParam(required = false)
            String location
    ) {
        ProductSearchDTO dto = new ProductSearchDTO();
        dto.setStartDate(startDate);
        dto.setEndDate(endDate);
        dto.setLocation(location);

        List<ProductDTO> products = productService.searchAvailableProducts(dto);
        return ResponseEntity.ok(products);
    }


    @GetMapping("/locations")
    public ResponseEntity<List<String>> getLocations(@RequestParam String search) {
        try {
            List<String> locations = productService.getUniqueLocations(search);
            return ResponseEntity.ok(locations);
        } catch (Exception e) {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }
}
