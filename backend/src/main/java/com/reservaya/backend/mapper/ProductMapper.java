package com.reservaya.backend.mapper;

import com.reservaya.backend.dto.CategoryDTO;
import com.reservaya.backend.dto.FeatureDTO;
import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.entity.Category;
import com.reservaya.backend.entity.Feature;
import com.reservaya.backend.entity.Product;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductMapper {
    private final FeatureMapper featureMapper;

    public ProductMapper(FeatureMapper featureMapper) {
        this.featureMapper = featureMapper;
    }

    //Entity a DTO
    public ProductDTO toDTO(Product product){
        if(product == null) return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCurrency(product.getCurrency());
        dto.setPolicies(product.getPolicies());
        dto.setLocation(product.getLocation());

        if(product.getImageUrls() != null && !product.getImageUrls().isEmpty()) {
            dto.setImageUrls(new ArrayList<>(product.getImageUrls()));
            dto.setMainImageUrl(product.getImageUrls().get(0)); // Primera imagen como principal
        }

        //mapeo category
        if(product.getCategory() != null) {
            Category category = product.getCategory();
            dto.setCategoryId(category.getId());
            dto.setCategoryName(category.getName());

            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(category.getId());
            categoryDTO.setName(category.getName());
            categoryDTO.setDescription(category.getDescription());

            dto.setCategory(categoryDTO);

        }
        if(product.getFeatures() != null && !product.getFeatures().isEmpty()){
            List<FeatureDTO> featureDTOS = new ArrayList<>();
            for (Feature feature : product.getFeatures()){
                featureDTOS.add(featureMapper.toDTO(feature));
            }
            dto.setFeatures(featureDTOS);
        }

        return dto;
    }

    //DTO a Entity
    public Product toEntity(ProductDTO dto){
        if(dto == null) return null;

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setLocation(dto.getLocation());
        product.setPrice(dto.getPrice());
        product.setCurrency(dto.getCurrency());
        product.setPolicies(dto.getPolicies());

        if(dto.getCategory() != null){
            Category category = new Category();
            category.setId(dto.getCategory().getId());
            product.setCategory(category);
        }
        if(dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            product.setImageUrls(new ArrayList<>(dto.getImageUrls()));
        }

        return product;

    }
    public List<ProductDTO> toDTOList(List<Product> products){
        List<ProductDTO> productDTOS = new ArrayList<>();

        for (Product product : products){
            productDTOS.add(toDTO(product));
        }
        return productDTOS;
    }
}
