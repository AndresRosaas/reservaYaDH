package com.reservaya.backend.repository;

import com.reservaya.backend.entity.Category;
import com.reservaya.backend.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName (String name);
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingIgnoreCase(String name);
    @Query("SELECT p FROM Product p ORDER BY RAND()")
    List<Product> findRandomProducts(Pageable pageable);
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category WHERE p.id =:id")
    Optional<Product> findByIdWithCategory(@Param("id") Long id);

}
