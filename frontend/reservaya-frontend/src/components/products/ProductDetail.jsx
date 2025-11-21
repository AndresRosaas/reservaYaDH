import './ProductDetail.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ProductGallery from './ProductGallery';
import { availableIcons } from '../layout/icons';
import AvailabilityCalendar from './AvailabilityCalendar';
import ShareModal from './ShareModal';
import ReviewList from '../reviews/ReviewsList';
import ReviewForm from '../reviews/ReviewsForm';


const ProductDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();//Con esto puedo navegar programaticamente
    const [showShareModal, setShowShareModal] = useState(false);
    const [product, setProduct] = useState(null);//Estado para guardar la info del producto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);
    const [reviewRefresh, setReviewsRefresh] = useState(0);

    //useeffect se ejecuta cuando el componente se carga
    useEffect(() => {
        fetchProduct();
    }, [id]);//El efecto se vuelve a ejecutar si el id cambia

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);//Llamo a la API para obtener el producto por id
            setProduct(response.data);
            setError(null);
        } catch (err) {
            setError('Producto no encontrado.');
            console.error('Error: ', err);

        } finally {
            setLoading(false);
        }
    };

    const handleDateSelect = (dates) => {
        setSelectedDates(dates);
    };

    const handleReviewSubmitted = () => {
        setReviewsRefresh(prev => prev + 1);
    };

    const formatPrice = () => {
        if (!product) return '';
        const price = parseFloat(product.price);
        if (isNaN(price)) return '';
        const formatted = price.toLocaleString('es-ES', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

        return `${product.currency} ${formatted}`;
    };
    if (loading) return <div>Cargando producto...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return null;

    return (

        <div className="product-detail">
            {/* Botón volver */}
            <div className='detail-buttons'>
                <button
                    onClick={() => navigate(-1)}
                    className='btn btn-outline'>
                    ← Volver
                </button>

            </div>


            {/* Título */}
            <h1 className="product-detail-title">{product.name}</h1>

            {/* ✅ GALERÍA DE IMÁGENES */}
            {product.imageUrls && product.imageUrls.length > 0 && (
                <ProductGallery images={product.imageUrls} />
            )}
            <div className='product-detail-top'>
                {/*precio, ubicacion y categoria*/}
                <div className='product-detail-left'>

                    <div className='product-detail-highlight'>
                        <div className='product-detail-price'>
                            <span className='price-label'>Precio: </span>
                            <span className='price-value'>{formatPrice()}</span>
                        </div>
                        <div className='product-detail-location'>
                            <span className='locacion-label'>📍 Ubicación </span>
                            <span className='location-value'>{product.location}</span>
                        </div>

                        {/*Si tiene categoria la muestro*/}
                        {product.category && (
                            <div className='product-detail-category'>
                                <span className='category-label'>🏷️ Categoría:</span>
                                <span className='category-value'>{product.category?.name}</span>
                            </div>
                        )}
                        {/**Caracteristicas */}
                        {product.features && product.features.length > 0 && (
                            <div className='product-detail-features'>
                                <h3>Caracteristicas</h3>
                                <div className='features-grid'>
                                    {product.features.map(feature => (
                                        <div key={feature.id} className='feature-item'>
                                            <span>{(() => {
                                                const IconComponent = availableIcons[feature.icon]?.component;
                                                return IconComponent ? <IconComponent size={18} /> : '❓';
                                            })()} </span>
                                            <span className='feature-name'>{feature.name}</span>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        )}

                        <div className="product-detail-section">
                            <h2>Descripcion</h2>
                            <p>{product.description}</p>
                        </div>



                        <div className="product-detail-section">
                            <h2>Políticas</h2>
                            <p>{product.policies}</p>

                        </div>
                    </div>
                    <button className='btn btn-outline' onClick={() => setShowShareModal(true)}>
                        📤 Compartir
                    </button>

                    {showShareModal && (
                        <ShareModal
                            product={product}
                            onClose={() => setShowShareModal(false)}
                        />
                    )}
                </div>
                <div className='product-detail-right'>
                    <div className='product-detail-availability'>
                        <AvailabilityCalendar
                            productId={product.id}
                            onDateSelect={handleDateSelect}
                        />
                    </div>

                </div>

            </div>
            <div className='product-detail-section'>
                <h2>Reseñas</h2>
                <ReviewList
                    productId={product.id}
                    refreshTrigger={reviewRefresh}
                />
                <ReviewForm
                    productId={product.id}
                    onReviewSubmitted={handleReviewSubmitted}
                />
            </div>
        </div>
    );
};
export default ProductDetail;