package com.reservaya.backend.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public class ProductDTO {
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String name;
    @NotBlank(message = "La descripcion es obligatoria")
    @Size(min = 3, max = 2000, message = "La descripcion debe tener entre 3 y 2000 caracteres")
    private String description;
    @NotBlank(message = "La ubicacion es obligatoria")
    private String location;
    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal price;
    @Size(max = 10)
    private String currency; // puedo poner mas de una moneda y que calcule

    //relacion producto categoria
    private String categoryName;

    private Long categoryId;
    private CategoryDTO category;

    //Imagenes del producto
    @NotEmpty(message = "Debe incluir al menos una imagen")
    private List<String> imageUrls;
    private String mainImageUrl;

    //Caracteristicas
    private List<FeatureDTO> features;
    private List<Long> featuresIds;

    //Politicas
    @Size(max = 5000, message = "Las políticas no pueden superar 5000 caracteres")
    private String policies;

    //Puntuacion promedio
    private Double averageRating;
    private Integer totalRating;

    public ProductDTO() {
        this.currency = "ARS"; //valor por defecto
    }

    public ProductDTO(String name, String description, String location, BigDecimal price, Long categoryId, String currency) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.price = price;
        this.categoryId = categoryId;
        this.currency = "ARS";
    }

    public ProductDTO(Long id, String name, String description, String location, BigDecimal price, String currency, Long categoryId, String categoryName, List<String> imageUrls, String mainImageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.price = price;
        this.currency = currency;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.imageUrls = imageUrls;
        this.mainImageUrl = (imageUrls != null && !imageUrls.isEmpty()) ? imageUrls.get(0) : null;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getMainImageUrl() {
        return mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public List<FeatureDTO> getFeatures() {
        return features;
    }

    public void setFeatures(List<FeatureDTO> features) {
        this.features = features;
    }

    public String getPolicies() {
        return policies;
    }

    public void setPolicies(String policies) {
        this.policies = policies;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalRating() {
        return totalRating;
    }

    public void setTotalRating(Integer totalRating) {
        this.totalRating = totalRating;
    }

    public List<Long> getFeaturesIds() {
        return featuresIds;
    }

    public void setFeaturesIds(List<Long> featuresIds) {
        this.featuresIds = featuresIds;
    }
}