package com.reservaya.backend.repository;

import com.reservaya.backend.entity.User;
import com.reservaya.backend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail (String email);
    List<User> findByRole(UserRole role);
}