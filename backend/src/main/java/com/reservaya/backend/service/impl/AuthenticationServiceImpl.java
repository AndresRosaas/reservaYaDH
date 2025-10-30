package com.reservaya.backend.service.impl;

import com.reservaya.backend.configuration.JwtUtil;
import com.reservaya.backend.dto.LoginRequestDTO;
import com.reservaya.backend.dto.LoginResponseDTO;
import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.service.IAuthenticationService;
import com.reservaya.backend.service.IEmailService;
import com.reservaya.backend.service.IUserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements IAuthenticationService {
    private final IUserService iUserService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final IEmailService emailService;

    public AuthenticationServiceImpl(IUserService iUserService, JwtUtil jwtUtil, AuthenticationManager authenticationManager, IEmailService emailService) {
        this.iUserService = iUserService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        String token = jwtUtil.generateToken(loginRequest.getEmail());
        UserDTO userDTO = iUserService.findByEmail(loginRequest.getEmail());
        return new LoginResponseDTO(token, userDTO);
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        UserDTO registered = iUserService.register(userDTO);
        //Envio email de bienvenida
        try{
            emailService.sendWelcomeEmail(registered);
        }catch (Exception e){
            //Log del error pero no hace que falle el registro
            System.err.println("Error al enviar email: " + e.getMessage());
        }
        return registered;
    }
}
