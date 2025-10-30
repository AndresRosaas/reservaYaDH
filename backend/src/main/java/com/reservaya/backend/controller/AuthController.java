package com.reservaya.backend.controller;

import com.reservaya.backend.dto.LoginRequestDTO;
import com.reservaya.backend.dto.LoginResponseDTO;
import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.service.IAuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final IAuthenticationService authenticationService;

    public AuthController(IAuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register (@RequestBody UserDTO userDTO){
        UserDTO registered = authenticationService.register(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registered);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login (@RequestBody LoginRequestDTO loginRequest){
        LoginResponseDTO response = authenticationService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}
