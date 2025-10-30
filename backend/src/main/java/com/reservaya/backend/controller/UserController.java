package com.reservaya.backend.controller;

import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.enums.UserRole;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    //Listar todos los ADMIN
    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        List<UserDTO> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        Optional<UserDTO> findUser = userService.findById(id);
        return findUser.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserDTO> updateRole(@PathVariable Long id, @RequestParam UserRole role) {
        UserDTO updated = userService.updateRole(id, role);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserDTO> delete(@PathVariable Long id) throws ResourceNotFoundException {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
