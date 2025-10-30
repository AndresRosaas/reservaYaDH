package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.ProductDTO;
import com.reservaya.backend.entity.Category;
import com.reservaya.backend.entity.Feature;
import com.reservaya.backend.entity.Product;
import com.reservaya.backend.exception.ResourceNotFoundException;
import com.reservaya.backend.mapper.ProductMapper;
import com.reservaya.backend.repository.ICategoryRepository;
import com.reservaya.backend.repository.IFeatureRepository;
import com.reservaya.backend.repository.IProductRepository;
import com.reservaya.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {

    private final IProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ICategoryRepository categoryRepository;
    private final IFeatureRepository featureRepository;

    public ProductServiceImpl(IProductRepository productRepository, ProductMapper productMapper, ICategoryRepository categoryRepository, IFeatureRepository featureRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.categoryRepository = categoryRepository;
        this.featureRepository = featureRepository;
    }

    //Crear el producto
    @Override
    public ProductDTO save (ProductDTO productDTO){
        //Valido si existe el producto
        if(productRepository.existsByName(productDTO.getName())){
            throw new ResourceNotFoundException("Ya existe un producto con el nombre: " + productDTO.getName());

        }
        //Paso el DTO a entity con el mapper creado
        Product product = productMapper.toEntity(productDTO);

        //Si tiene categoryID buscar esa categoria y asignarla
        if (productDTO.getCategoryId() != null){
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(()-> new ResourceNotFoundException(
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
    public Optional<ProductDTO> findById(Long id) throws ResourceNotFoundException{
        //Busco en BD
        Optional<Product> productOptional = productRepository.findByIdWithCategory(id);
        return productOptional.map(productMapper::toDTO);
    }
    //Actualizo el producto
    @Override
    public ProductDTO update(Long id, ProductDTO productDTO){
        //Verifico si el producto existe
        Product existProduct = productRepository.findById(productDTO.getId())
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Producto no encontrado con ID: " +productDTO.getId()
                ));
        //Actualizo los campos que llegan
        existProduct.setName(productDTO.getName());
        existProduct.setDescription(productDTO.getDescription());
        existProduct.setLocation(productDTO.getLocation());
        existProduct.setPrice(productDTO.getPrice());
        existProduct.setCurrency(productDTO.getCurrency());
        existProduct.setPolicies(productDTO.getPolicies());

        //Si llegan imagenes tambien tengo que actualizarla
        if(productDTO.getMainImageUrl() != null){
            existProduct.setImageUrls(productDTO.getImageUrls());
        }
        //Si se cambio la categoria la tengo que actualizar
        if(productDTO.getCategoryId()!=null){
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(()-> new ResourceNotFoundException(
                            "Categoria no encontrada con ID: " + productDTO.getCategoryId()
                    ));
            existProduct.setCategory(category);
        }
        //Guardo los cambios
        Product updateProduct = productRepository.save(existProduct);
        //Convierto a DTO la entidad y la devuelvo
        return productMapper.toDTO(updateProduct);
    }
   //Borro el producto
    @Override
    public void delete(Long id) throws ResourceNotFoundException{
        //primero verifico si existe en BD
        if(!productRepository.existsById(id)){
            throw new ResourceNotFoundException("Producto no encontrado con ID " + id);
        }
        productRepository.deleteById(id);
    }

    //Busco todos los productos
    @Override
    public List<ProductDTO> findAll(){
        //Listo to do de la DB
        List<Product> products = productRepository.findAll();

        //convierto la lista de entidades a DTOS
        return productMapper.toDTOList(products);
    }
    @Override
    public List<ProductDTO> findRandom(int limit){
        //Creo un Pageable con el limite
        Pageable pageable = PageRequest.of(0, limit);
        //Obtengo productos aleratorios
        List<Product> randomProducts = productRepository.findRandomProducts(pageable);
        //Los convierto a DTO con mapper
        return productMapper.toDTOList(randomProducts);
    }
    @Override
    public Page<ProductDTO> findPaginated(int page, int size){
        //Creo el pageable
        Pageable pageable = PageRequest.of(page, size);
        //Obtengo la pagina de productos
        Page<Product> productPage = productRepository.findAll(pageable);

        //conviero el page<product> a page<productDTO>
        return productPage.map(productMapper::toDTO);
    }
    @Override
    public boolean findByName(String firstName){
        return productRepository.existsByName(firstName);
    }
    @Override
    public ProductDTO assignCategory(Long productId, Long categoryId){
        //Busco que exista el producto
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + productId
                ));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Categoria no encontrado con id: " + productId
                ));
        product.setCategory(category);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }

    @Override
    public ProductDTO addFeature (Long productId, Long featureId){
        //Busco que exista el producto
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + productId
                ));
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Caracteristica no encontrada con id: " + featureId
                ));
        product.getFeatures().add(feature);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }
    @Override
    public ProductDTO removeFeature (Long productId, Long featureId){
        //Busco que exista el producto
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + productId
                ));
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(()-> new ResourceNotFoundException(
                        "Caracteristica no encontrada con id: " + featureId
                ));
        product.getFeatures().remove(feature);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDTO(updatedProduct);
    }
    @Override
    public List<ProductDTO> findCategoryById(Long categoryId){
        if(!categoryRepository.existsById(categoryId)){
            throw new ResourceNotFoundException(
                    "Categoria no encontrada con ID: " + categoryId
            );
        }
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return productMapper.toDTOList(products);
    }

}



