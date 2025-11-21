package com.reservaya.backend.dto;

import com.reservaya.backend.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserDTO {
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String firstName;
    @NotBlank(message = "El apellido es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String lastName;
    @NotBlank(message = "El email es obligatorio")
    @Email( message = "El nombre debe ser valido")
    private String email;
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener 8 caracteres")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[0-9]).*$",
            message = "La contraseña debe contener al menos una mayúscula y un número")
    private String password;
    @NotBlank(message = "Debe confirmar la contraseña")
    private String confirmPassword;
    private UserRole role;
    private String avatar; //Imagen o iniciales

    public UserDTO() {
    }

    public UserDTO(Long id, String firstName, String lastName, String email, String password, String confirmPassword, UserRole role, String avatar) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
        this.avatar = avatar;
    }

    public UserDTO(String avatar, Long id, String firstName, String lastName, String email, UserRole role) {
        this.avatar = avatar;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}