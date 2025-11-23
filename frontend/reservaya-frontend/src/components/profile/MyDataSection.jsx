import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import './MyDataSection.css';
import api from "../../services/api";


function MyDataSection() {
    const { user } = useAuth();
    const [nextTrip, setNextStrip] = useState(null);
    const [loading, SetLoading] = useState(false);

    useEffect(() => {
        if (user?.id) {
            loadNextTrip();
        }
    }, [user]);


    const loadNextTrip = async () => {
        try {
            const response = await api.get(`/reservations/user/${user.id}`);
            const reservations = response.data;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const upcoming = reservations
                .filter(r => r.status === 'CONFIRMED' && new Date(r.startDate) > today)
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            if (upcoming.length > 0) {
                const next = upcoming[0];
                const startDate = new Date(next.startDate);
                const diffDays = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
                setNextStrip({ ...next, daysUntil: diffDays });
            }

        } catch (error) {
            console.error('Error al cargar reservas: ', error);
        } finally {
            SetLoading(false);
        }
    }

    return (
        <div className="profile-section">
            <div className="my-data-section">
                <h2>Mis Datos</h2>

                {!loading && nextTrip && (
                    <div className="next-trip-banner">
                        <span className="next-trip-icon">🏖️</span>
                        <div className="next-trip-info">
                            <strong>
                                {nextTrip.daysUntil === 1
                                    ? 'Mañana empieza tu viaje'
                                    : `Faltan ${nextTrip.daysUntil} dias para tu viaje!`}
                            </strong>
                            <span>{nextTrip.productName}</span>
                        </div>
                    </div>
                )}
                <div className="data-grid">
                    <div className="data-field">
                        <label>Nombre:</label>
                        <p>{user?.firstName}</p>
                    </div>
                    <div className="data-field">
                        <label>Apellido:</label>
                        <p>{user?.lastName}</p>
                    </div>
                    <div className="data-field">
                        <label>Email:</label>
                        <p>{user?.email}</p>
                    </div>
                    <div className="data-field">
                        <label>Rol:</label>
                        <p className="role-badge">{user?.role}</p>
                    </div>
                </div>
                <p>Funcionalidad de edicion proximamente</p>
            </div>
        </div>

    );
}
export default MyDataSection;