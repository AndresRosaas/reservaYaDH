package com.reservaya.backend.mapper;

import com.reservaya.backend.dto.FeatureDTO;
import com.reservaya.backend.entity.Feature;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FeatureMapper {
    //entity a DTO
    public FeatureDTO toDTO (Feature feature){
        if(feature == null) return null;

        FeatureDTO dto = new FeatureDTO();
        dto.setId(feature.getId());
        dto.setName(feature.getName());
        dto.setIcon(feature.getIcon());

        return dto;
    }
    //DTO a entity
    public Feature toEntity(FeatureDTO featureDTO){
        if(featureDTO == null) return null;

        Feature feature = new Feature();
        feature.setId(featureDTO.getId());
        feature.setName(featureDTO.getName());
        feature.setIcon(featureDTO.getIcon());

        return feature;
    }

    List <FeatureDTO> toDTOList(List<Feature> features){
        List<FeatureDTO> featureDTOS = new ArrayList<>();

        for (Feature feature : features){
            featureDTOS.add(toDTO(feature));
        }
        return featureDTOS;
    }
}
