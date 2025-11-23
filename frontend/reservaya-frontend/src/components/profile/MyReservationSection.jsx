import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import "./MyDataSection.css";
import { toast } from "react-toastify";
import Modal from '../products/Modal';



function MyReservationSection() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reservationToCancel, setReservationToCancel] = useState(null);

    useEffect(() => {
        if (user?.id) {
            loadReservations();
        }
    }, [user]);

    const loadReservations = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/reservations/user/${user.id}`);
            setReservations(response.data);
        } catch (err) {
            console.error('Error al cargar reservas: ', err);
            setError('No se pudieron cargar las reservas');
        } finally {
            setLoading(false);
        }
    };
    const handleCancelClick = (reservationId) => {
        setReservationToCancel(reservationId);
        setShowModal(true);
    }

    const handleConfirmCancel = async () => {
        try {
            await api.delete(`/reservations/${reservationToCancel}`)
            toast.success('Reserva cancelada');
            loadReservations();
        } catch (error) {
            console.error('Error al cancelar: ', error);
            toast.error('Error al cancelar la reserva');
        } finally {
            setShowModal(false);
            setReservationToCancel(null);
        }
    };

    const handleCancelModal = () => {
        setShowModal(false);
        setReservationToCancel(null);
    }

    const getStatusLabel = (status) => {
        const labels = {
            PENDING: 'Pendiente',
            CONFIRMED: 'Confirmada',
            CANCELLED: 'Cancelada',
            COMPLETED: 'Completada'
        };
        return labels[status] || status;
    };
    const getStatusClass = (status) => {
        return `status-${status.toLowerCase()}`;
    };

    if (loading) return <div className="profile-section">Cargando reservas...</div>;
    if (error) return <div className="profile-section">{error}</div>;

    return (
        <div className="profile-section">
            <div className="my-reservation-section">
                <h2>Mis reservas</h2>

                {reservations.length === 0 ? (
                    <p>No tenes reservas todavia.</p>
                ) : (
                    <div className="reservations-list">
                        {reservations.map(reservation => (
                            <div
                                key={reservation.id}
                                className="reservation-card"
                                onClick={() => navigate(`/products/${reservation.productId}`)}
                            >
                                <div className="reservation-info">
                                    <h3>{reservation.productName}</h3>
                                    <p className="reservation-dates">
                                        {reservation.startDate} → {reservation.endDate}
                                    </p>
                                    <p className="reservation-currency">
                                        {reservation.currency} {reservation.totalPrice}
                                    </p>
                                </div>
                                <span className={`reservation-status ${getStatusClass(reservation.status)}`}>
                                    {getStatusLabel(reservation.status)}
                                </span>
                                {reservation.status === 'CONFIRMED' && (
                                    <button
                                        className="btn-cancel"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelClick(reservation.id);
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>


                )}
            </div>
            {showModal && (
                <Modal
                    message="Estas seguro de cancelar esta reserva?"
                    onConfirm={handleConfirmCancel}
                    onCancel={handleCancelModal}
                />
            )}
        </div>
    );
}
export default MyReservationSection;