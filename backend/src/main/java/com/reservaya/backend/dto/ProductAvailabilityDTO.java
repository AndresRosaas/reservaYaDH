package com.reservaya.backend.dto;

import java.util.List;

public class ProductAvailabilityDTO {
    private Long productId;
    private String productName;

    private List<DateRangeDTO> occupiedRanges;

    private Boolean fullyAvailable;

    public ProductAvailabilityDTO(Long productId, String productName, List<DateRangeDTO> occupiedRanges, Boolean fullyAvailable) {
        this.productId = productId;
        this.productName = productName;
        this.occupiedRanges = occupiedRanges;
        this.fullyAvailable = fullyAvailable;
    }

    public ProductAvailabilityDTO() {

    }

    public Boolean getFullyAvailable() {
        return fullyAvailable;
    }

    public void setFullyAvailable(Boolean fullyAvailable) {
        this.fullyAvailable = fullyAvailable;
    }

    public List<DateRangeDTO> getOccupiedRanges() {
        return occupiedRanges;
    }

    public void setOccupiedRanges(List<DateRangeDTO> occupiedRanges) {
        this.occupiedRanges = occupiedRanges;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
