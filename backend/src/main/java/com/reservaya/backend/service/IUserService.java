package com.reservaya.backend.service;

import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.entity.User;
import com.reservaya.backend.enums.UserRole;
import com.reservaya.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    UserDTO save (UserDTO userDTO);
    UserDTO findByEmail(String email);
    List<UserDTO> findAll();
    Optional<UserDTO> findById(Long id) throws ResourceNotFoundException;
    void delete (Long id) throws ResourceNotFoundException;
    UserDTO updateRole(Long userId, UserRole role);
    UserDTO register (UserDTO userDTO);
}
