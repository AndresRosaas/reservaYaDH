import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import './ReservationPage.css';

function ReservationPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reserving, setReserving] = useState(false);
    const { startDate, endDate } = location.state || {};

    useEffect(() => {
        if (!startDate || !endDate) {
            navigate(`/products/${id}`);
        }

        if (!user) {
            navigate('/login', { state: { from: `/products/${id}` } });
            return;
        }
        loadProduct();
    }, [id, user])

    const loadProduct = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);
            setProduct(response.data)
        } catch (error) {
            console.error('Error alcargar el producto: ', error);
            toast.error('Error al cargar el producto');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const formDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDateApi = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const calculateNights = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        if (!product) return 0;
        const nights = calculateNights();
        return product.price * nights;
    };

    const handleConfirm = async () => {
        try {
            setReserving(true);
            await api.post(`/reservations`, {
                userId: user.id,
                productId: product.id,
                startDate: formatDateApi(startDate),
                endDate: formatDateApi(endDate)
            });
            toast.success('Reserva confirmada! Te enviamos un mail con los detalles de tu reserva.');
            navigate('/perfil?section=reservas');
        } catch (error) {
            console.error('Error al reservar: ', error);
            toast.warning(err.response?.data?.message || 'Error al realizar la reserva');
        } finally {
            setReserving(false);

        }
    };

    if (!product) return null;

    const nights = calculateNights();
    const total = calculateTotal();

    return (
        <div className="reservation-page">
            <div className="reservation-container">
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
                <h1>Confirmar Reserva</h1>
                <div className="reservation-content">
                    <div className="reservation-product">
                        <h2>Producto</h2>
                        {product.imageUrls?.length > 0 && (
                            <img src={product.imageUrls[0]} alt={product.name} className="product-image" />
                        )}
                        <h3>{product.name}</h3>
                        <p className="product-location">📍 {product.location}</p>
                    </div>
                    <div className="reservation-details">
                        <h2>Detalles de la reserva</h2>
                        <div className="detail-row">
                            <span>Check-in:</span>
                            <strong>{formDate(startDate)}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Check-out:</span>
                            <strong>{formDate(endDate)}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Noches:</span>
                            <strong>{nights}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Precio por noche:</span>
                            <strong>{product.currency} {product.price?.toLocaleString('es-ES')}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Total:</span>
                            <strong>{product.currency} {total.toLocaleString('es-ES')}</strong>
                        </div>
                    </div>
                    <div className="reservation-user">
                        <h2>Tus Datos</h2>
                        <div className="detail-row">
                            <span>Nombre:</span>
                            <strong>{user?.firstName} {user?.lastName}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Email:</span>
                            <strong>{user?.email}</strong>
                        </div>
                    </div>
                </div>
                <button 
                className="btn btn-primary btn-confirm"
                onClick={handleConfirm}
                disabled={reserving}
                >
                    {reserving ? 'Procesadno...' : 'Confirmar Reserva'}
                </button>
            </div>
        </div>
    );
}
export default ReservationPage;