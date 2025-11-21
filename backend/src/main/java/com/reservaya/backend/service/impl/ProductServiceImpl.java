package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.*;
import com.reservaya.backend.entity.Category;
import com.reservaya.backend.entity.Feature;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.entity.Reservation;
import com.reservaya.backend.enums.ReservationStatus;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.ProductMapper;
import com.reservaya.backend.repository.ICategoryRepository;
import com.reservaya.backend.repository.IFeatureRepository;
import com.reservaya.backend.repository.IProductRepository;
import com.reservaya.backend.repository.IReservationRepository;
import com.reservaya.backend.service.IProductService;
import com.reservaya.backend.service.IReviewService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {

    private final IProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ICategoryRepository categoryRepository;
    private final IFeatureRepository featureRepository;
    private final IReservationRepository reservationRepository;
    private final IReviewService reviewService;

    public ProductServiceImpl(IProductRepository productRepository,
                              ProductMapper productMapper,
                              ICategoryRepository categoryRepository,
                              IFeatureRepository featureRepository,
                              IReservationRepository reservationRepository,
                              IReviewService reviewService) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.categoryRepository = categoryRepository;
        this.featureRepository = featureRepository;
        this.reservationRepository = reservationRepository;
        this.reviewService = reviewService;
    }

    //Crear el producto
    @Override
    public ProductDTO save(ProductDTO productDTO) {
        //Valido si existe el producto
        if (productRepository.existsByName(productDTO.getName())) {
            throw new ResourceNotFoundException("Ya existe un producto con el nombre: " + productDTO.getName());

        }
        //Paso el DTO a entity con el mapper creado
        Product product = productMapper.toEntity(productDTO);

        //Si tiene categoryID buscar esa categoria y asignarla
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoria no encontrada con ID: " + productDTO.getCategoryId()
                    ));
            product.setCategory(category);
        }
        Product savedProduct = productRepository.save(product);
        //Convertir entity guardada a DTO usando mapper y devolver
        return productMapper.toDTO(savedProduct);
    }

    //Busco producto por ID
    @Override
    public Optional<ProductDTO> findById(Long id) throws ResourceNotFoundException {
        //Busco en BD
        Optional<Product> productOptional = productRepository.findByIdWithCategory(id);
        if (productOptional.isPresent()) {
            ProductDTO productDTO = productMapper.toDTO(productOptional.get());
            //Calculo y agrego promedio de reviews
            Double averageRating = reviewService.getAverageRating(id);
            productDTO.setAverageRating(averageRating);
            //Calculo total de reviews
            List<ReviewDTO> reviews = reviewService.getProductsReview(id);
            productDTO.setTotalRating(reviews.size());

            return Optional.of(productDTO);
        }
        return Optional.empty();
    }

    //Actualizo el producto
    @Override
    public ProductDTO update(Long id, ProductDTO productDTO) {
        //Verifico si el producto existe
        Product existProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con ID: " + id
                ));
        //Actualizo los campos que llegan
        existProduct.setName(productDTO.getName());
        existProduct.setDescription(productDTO.getDescription());
        existProduct.setLocation(productDTO.getLocation());
        existProduct.setPrice(productDTO.getPrice());
        existProduct.setCurrency(productDTO.getCurrency());
        existProduct.setPolicies(productDTO.getPolicies());

        //Si llegan imagenes tambien tengo que actualizarla
        if (productDTO.getMainImageUrl() != null && productDTO.getImageUrls().isEmpty()) {
            List<String> updatedImages = new ArrayList<>();

            //guardo las que ya hay
            if (existProduct.getImageUrls() != null) {
                updatedImages.addAll(existProduct.getImageUrls());
            }
            //sumo las nuevas
            updatedImages.addAll(productDTO.getImageUrls());
            existProduct.setImageUrls(updatedImages);
        }
        //Si se cambio la categoria la tengo que actualizar
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoria no encontrada con ID: " + productDTO.getCategoryId()
                    ));
            existProduct.setCategory(category);
        }
        if (productDTO.getFeaturesIds() != null) {
            List<Feature> newFeatures = featureRepository.findAllById(productDTO.getFeaturesIds());
            existProduct.setFeatures(new HashSet<>(newFeatures));
        }


        //Guardo los cambios
        Product updateProduct = productRepository.save(existProduct);
        //Convierto a DTO la entidad y la devuelvo
        return productMapper.toDTO(updateProduct);
    }

    //Borro el producto
    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        //primero verifico si existe en BD
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado con ID " + id);
        }
        productRepository.deleteById(id);
    }

    //Busco todos los productos
    @Override
    public List<ProductDTO> findAll() {
        //Listo to do de la DB
        List<Product> products = productRepository.findAll();

        //convierto la lista de entidades a DTOS
        return productMapper.toDTOList(products);
    }

    @Override
    public List<ProductDTO> findRandom(int limit) {
        //Creo un Pageable con el limite
        Pageable pageable = PageRequest.of(0, limit);
        //Obtengo productos aleratorios
        List<Product> randomProducts = productRepository.findRandomProducts(pageable);
        //Los convierto a DTO con mapper
        return productMapper.toDTOList(randomProducts);
    }

    @Override
    public Page<ProductDTO> findPaginated(int page, int size) {
        //Creo el pageable
        Pageable pageable = PageRequest.of(page, size);
        //Obtengo la pagina de productos
        Page<Product> productPage = productRepository.findAll(pageable);

        //conviero el page<product> a page<productDTO>
        return productPage.map(productMapper::toDTO);
    }

    @Override
    public boolean findByName(String firstName) {
        return productRepository.existsByName(firstName);
    }

    @Override
    public ProductDTO assignCategory(Long productId, Long categoryId) {
        //Busco que exista el producto
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + productId
                ));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Categoria no encontrado con id: " + productId
                ));
        product.setCategory(category);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }

    @Override
    public ProductDTO addFeature(Long productId, Long featureId) {
        //Busco que exista el producto
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + productId
                ));
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caracteristica no encontrada con id: " + featureId
                ));
        product.getFeatures().add(feature);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }

    @Override
    public ProductDTO removeFeature(Long productId, Long featureId) {
        //Busco que exista el producto
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + productId
                ));
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Caracteristica no encontrada con id: " + featureId
                ));
        product.getFeatures().remove(feature);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }

    @Override
    public List<ProductDTO> findCategoryById(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException(
                    "Categoria no encontrada con ID: " + categoryId
            );
        }
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return productMapper.toDTOList(products);
    }

    @Override
    public List<ProductDTO> searchAvailableProducts(ProductSearchDTO searchDTO) {
        List<Product> products;
        if (searchDTO.getStartDate() != null && searchDTO.getEndDate() != null) {
            products = productRepository.findAvailableProducts(
                    searchDTO.getStartDate(),
                    searchDTO.getEndDate()
            );
        } else {
            products = productRepository.findAll();
        }
        //filtro por categoria si viene
        if (searchDTO.getCategoryId() != null) {
            products = products.stream()
                    .filter(p -> p.getCategory() != null &&
                            p.getCategory().getId().equals(searchDTO.getCategoryId()))
                    .collect(Collectors.toList());
        }
        if (searchDTO.getLocation() != null && !searchDTO.getLocation().isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getLocation().toLowerCase()
                            .contains(searchDTO.getLocation().toLowerCase()))
                    .collect(Collectors.toList());
        }
        return productMapper.toDTOList(products);
    }

    @Override
    public ProductAvailabilityDTO getAvailability(Long productId, LocalDate startDate, LocalDate endDate) {
        //Verificar que el producto exista
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con ID: " + productId
                ));
        //obtengo las reservas de ese rango
        List<Reservation> reservations = reservationRepository
                .findByProductAndDateRange(productId, startDate, endDate);
        //Convierto a DTO
        List<DateRangeDTO> occupiedDates = reservations.stream()
                .filter(r -> !r.getStatus().equals(ReservationStatus.CANCELLED))
                .map(r -> new DateRangeDTO(r.getStartDate(), r.getEndDate()))
                .collect(Collectors.toList());

        ProductAvailabilityDTO availabilityDTO = new ProductAvailabilityDTO();
        availabilityDTO.setProductId(productId);
        availabilityDTO.setProductName(product.getName());
        availabilityDTO.setOccupiedRanges(occupiedDates);
        availabilityDTO.setFullyAvailable(occupiedDates.isEmpty());
        return availabilityDTO;
    }

    @Override
    public List<String> getUniqueLocations(String search){
        return productRepository.findAll()
                .stream()
                .map(Product::getLocation)
                .filter(location -> location != null &&
                        !location.isEmpty() &&
                        location.toLowerCase().contains(search.toLowerCase()))
                .distinct()
                .limit(5)
                .collect(Collectors.toList());
    }
}



