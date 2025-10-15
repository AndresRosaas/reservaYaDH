package com.reservaya.backend.repository;

import com.reservaya.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long>{
    Optional<Category>findByName(String name);
    boolean existsByName(String name);


}
