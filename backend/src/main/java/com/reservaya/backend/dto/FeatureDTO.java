package com.reservaya.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FeatureDTO {
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String name;
    @NotBlank(message = "El icono es obligatorio")
    @Size(max = 50, message = "El icono no puede tener mas de 50 caracteres")
    private String icon; // URL o clase CSS del icono

    public FeatureDTO() {
    }

    public FeatureDTO(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    public FeatureDTO(Long id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
