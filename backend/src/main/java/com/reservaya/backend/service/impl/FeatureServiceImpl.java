package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.FeatureDTO;
import com.reservaya.backend.entity.Feature;
import com.reservaya.backend.exception.DuplicateResourceException;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.FeatureMapper;
import com.reservaya.backend.repository.IFeatureRepository;
import com.reservaya.backend.service.IFeatureService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FeatureServiceImpl implements IFeatureService {

    private final IFeatureRepository featureRepository;
    private final FeatureMapper featureMapper;

    @Autowired
    public FeatureServiceImpl(IFeatureRepository featureRepository, FeatureMapper featureMapper) {
        this.featureRepository = featureRepository;
        this.featureMapper = featureMapper;
    }

    @Override
    public FeatureDTO save(FeatureDTO featureDTO) {
        //Valido que no exista el feature
        if (featureRepository.existsByName(featureDTO.getName())) {
            throw new ResourceNotFoundException("Existe la caracteristica con nombre: " + featureDTO.getName());
        }

        // paso el dto a entity
        Feature feature = featureMapper.toEntity(featureDTO);
        Feature savedFeature = featureRepository.save(feature);

        return featureMapper.toDTO(savedFeature);
    }

    @Override
    public FeatureDTO update(Long id, FeatureDTO featureDTO) {
        //Existe la caracteristia a actualizar?
        Feature existsFeature = featureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(" Carateristica no encontrada con id: " + id));
        // Ahora tengo que fijarme si la caracteristica con ese nombre existe
        if (!existsFeature.getName().equals(featureDTO.getName())
                && featureRepository.existsByName(featureDTO.getName())) {
            throw new DuplicateResourceException(
                    "Ya existe una caracteristica con el nombre: " + featureDTO.getName()
            );
        }
        //Actualizo la info
        existsFeature.setName(featureDTO.getName());
        existsFeature.setIcon(featureDTO.getIcon());
        //Guardo
        Feature updateFeature = featureRepository.save(existsFeature);

        return featureMapper.toDTO(updateFeature);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        //Verifico si existe
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caracteristisca no encontrada con id: " + id
                ));
       //Verifico que no este usada la cracteristrica en un producto
        if(!feature.getProducts().isEmpty()){
            throw new IllegalArgumentException(
                    "No se puede eliminar la caracteristica porque esta siendo usada por " +
                            feature.getProducts().size() + " producto(s)"
            );
        }

        featureRepository.delete(feature);

    }

    @Override
    public List<FeatureDTO> findAll() {
        List<Feature> features = featureRepository.findAll();
        return featureMapper.toDTOList(features);
    }

    @Override
    public Optional<FeatureDTO> findById(Long id) throws ResourceNotFoundException {
        //Busco en BD
        Optional<Feature> featureOptional = featureRepository.findById(id);
        return featureOptional.map(featureMapper::toDTO);
    }

    @Override
    public FeatureDTO findByName(String name) {
        Feature feature = featureRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Caracteristica no encontrada con nombre: " + name));
        return featureMapper.toDTO(feature);
    }

    @Override
    public boolean existsByName(String name) {
        return featureRepository.existsByName(name);
    }

}
