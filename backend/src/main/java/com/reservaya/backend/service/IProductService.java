package com.reservaya.backend.service;

import com.reservaya.backend.dto.DateRangeDTO;
import com.reservaya.backend.dto.ProductAvailabilityDTO;
import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.dto.ProductSearchDTO;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IProductService {
    //Guardo el producto
    ProductDTO save(ProductDTO productDTO);
    //Busco por ID
    Optional<ProductDTO> findById(Long id) throws ResourceNotFoundException;
    //Listo todos los productos
    List<ProductDTO> findAll();
    //Busco productos random
    List<ProductDTO> findRandom(int limit);
    //Borro productos
    void delete (Long id) throws ResourceNotFoundException;
    //Actualizo productos
    ProductDTO update(Long id, ProductDTO productDTO);
    //Coloco un booleano para saber si existe o no
    boolean findByName(String firstName);
    //Pagino los productos para que se muestren solo una cantidad
    Page<ProductDTO> findPaginated(int page, int size);
    ProductDTO assignCategory(Long productId, Long categoryId);
    ProductDTO addFeature(Long productId, Long featureId);
    ProductDTO removeFeature (Long productId, Long featureId);
    List<ProductDTO> findCategoryById(Long categoryId);
    //Busqueda
    List<ProductDTO> searchAvailableProducts(ProductSearchDTO searchDTO);
    //veo si esta disponible
    ProductAvailabilityDTO getAvailability (Long productId, LocalDate startDate, LocalDate endDate);
    List<String> getUniqueLocations(String search);



}
