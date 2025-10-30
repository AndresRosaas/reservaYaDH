package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.entity.User;
import com.reservaya.backend.enums.UserRole;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.UserMapper;
import com.reservaya.backend.repository.IUserRepository;
import com.reservaya.backend.service.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(IUserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO save(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario registrado con el email: " + userDTO.getEmail());
        }
        User user = userMapper.toEntity(userDTO);
        User userSaved = userRepository.save(user);
        return userMapper.toDTO(userSaved);
    }

    @Override
    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No hay usuario registrado con email: " + email));
        return userMapper.toDTO(user);
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        return userMapper.toDTOList(users);
    }

    @Override
    public Optional<UserDTO> findById(Long id) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(userMapper::toDTO);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe Usuario con Id: " + id
                ));
        userRepository.delete(user);

    }

    @Override
    public UserDTO updateRole(Long userId, UserRole role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario con Id " + userId + "no encontrado"
                ));
        user.setRole(role);
        User userSaved = userRepository.save(user);

        return userMapper.toDTO(userSaved);
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario con el email: " + userDTO.getEmail());
        }
        //Valido si las contraseñas coinciden
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        if (userDTO.getRole() == null){
            userDTO.setRole(UserRole.USER);
        }
        User user = userMapper.toEntity(userDTO);
        User savedUser = userRepository.save(user);

        return userMapper.toDTO(savedUser);
    }
}
