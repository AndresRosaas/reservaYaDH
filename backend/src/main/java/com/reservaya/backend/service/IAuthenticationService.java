package com.reservaya.backend.service;

import com.reservaya.backend.dto.LoginRequestDTO;
import com.reservaya.backend.dto.LoginResponseDTO;
import com.reservaya.backend.dto.UserDTO;

public interface IAuthenticationService {
    LoginResponseDTO login(LoginRequestDTO loginRequest);
    UserDTO register (UserDTO userDTO);
}
