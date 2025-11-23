package com.reservaya.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.reservaya.backend.enums.ReservationStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReservationDTO {
    //Identifico por ID
    private Long id;
    private Long userId;
    private Long productId;

    //Informacion sobre usuario/producto
    private String userName;
    private String userEmail;
    private String productName;

    //Fechas
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    @JsonFormat(pattern = "yyyy-MM-dd 'T' HH:mm:ss")
    private LocalDateTime reservationDate;

    //Estado
    private ReservationStatus status;
    //
    private UserDTO user;
    private ProductDTO product;
    private BigDecimal totalPrice;
    private String currency;

    public ReservationDTO() {
    }

    public ReservationDTO(Long userId, Long productId, LocalDate startDate, LocalDate endDate) {
        this.userId = userId;
        this.productId = productId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reservationDate = LocalDateTime.now();
        this.status = ReservationStatus.PENDING;
    }

    public ReservationDTO(Long id, Long userId, Long productId, String userName, String userEmail, String productName, LocalDate startDate, LocalDate endDate, LocalDateTime reservationDate, ReservationStatus status, UserDTO user, ProductDTO product, BigDecimal totalPrice, String currency) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.productName = productName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reservationDate = reservationDate;
        this.status = status;
        this.user = user;
        this.product = product;
        this.totalPrice = totalPrice;
        this.currency = currency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}

