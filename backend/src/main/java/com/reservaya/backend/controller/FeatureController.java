package com.reservaya.backend.controller;

import com.reservaya.backend.dto.FeatureDTO;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.service.IFeatureService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/features")
public class FeatureController {

    private final IFeatureService featureService;

    public FeatureController(IFeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public ResponseEntity<List<FeatureDTO>> findAll() {
        List<FeatureDTO> features = featureService.findAll();
        return ResponseEntity.ok(features);
    }

    @PostMapping //Crear nueva Feature, solo admin
    public ResponseEntity<FeatureDTO> create(@Valid @RequestBody FeatureDTO dto) {
        FeatureDTO saved = featureService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<FeatureDTO>> findById(@PathVariable Long id) {
        Optional<FeatureDTO> featureToLook = featureService.findById(id);
        return ResponseEntity.ok(featureToLook);


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        featureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @PathVariable Long id, @RequestBody FeatureDTO featureDTO) {
        FeatureDTO featureUpdate = featureService.update(id, featureDTO);
        return ResponseEntity.ok(featureUpdate);


    }

}