import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MyDataSection from "../components/profile/MyDataSection";
import MyReservationSection from "./../components/profile/MyReservationSection";
import MyFavoriteSection from "./../components/profile/MyFavoriteSection";
import MyReviewSection from "../components/profile/MyReviewsSection";
import "./ProfilePage.css";

function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, loading } = useAuth();

    //obtengo una seccion de la url
    const getActiveSection = () => {
        const params = new URLSearchParams(location.search);
        return params.get('section') || 'datos';
    };

    const [activeSection, setActiveSection] = useState(getActiveSection());

    //actualizo cuando cambio de url
    useEffect(() => {
        setActiveSection(getActiveSection());
    }, [location.search]);

    //Si no este autenticado, redirigir
    useEffect(() => {
        if (!loading && !isAuthenticated()) {
            navigate('/login');
        }
    }, [loading, isAuthenticated, navigate]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        navigate(`/perfil?section=${section}`);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'datos':
                return <MyDataSection />;
            case 'reservas':
                return <MyReservationSection />;
            case 'favoritos':
                return <MyFavoriteSection />;
            case 'reseñas':
                return <MyReviewSection />;
            default:
                return <MyDataSection />;
        }
    };

    if (loading) return null;
    if (!user) return null;

    return (
        <>
            <Header />
            <div className="profile-page">
                <aside className="profile-sidebar">
                    <div className="sidebar-header">
                        <div className="user-avatar-large">
                            {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p className="user-email">{user.email}</p>
                    </div>
                    <nav className="profile-nav">

                        <button
                            className={`nav-item ${activeSection === 'datos' ? 'active' : ''}`}
                            onClick={() => handleSectionChange('datos')}
                        >
                            <span className="profile-nav-icon">📋</span>
                            <span className="profile-nav-label">Mis Datos</span>
                        </button>
                        <button
                            className={`nav-item ${activeSection === 'reservas' ? 'active' : ''}`}
                            onClick={() => handleSectionChange('reservas')}
                        >
                            <span className="profile-nav-icon">📅</span>
                            <span className="profile-nav-label">Mis Reservas</span>
                        </button>
                        <button
                            className={`nav-item ${activeSection === 'favoritos' ? 'active' : ''}`}
                            onClick={() => handleSectionChange('favoritos')}
                        >
                            <span className="profile-nav-icon">❤️</span>
                            <span className="profile-nav-label">Mis Favoritos</span>
                        </button>
                        <button
                            className={`nav-item ${activeSection === 'reseñas' ? 'active' : ''}`}
                            onClick={() => handleSectionChange('reseñas')}
                        >
                            <span className="profile-nav-icon">⭐</span>
                            <span className="profile-nav-label">Mis Reseñas</span>
                        </button>
                    </nav>
                    <div className='sidebar-footer'>
                        <button className='btn btn-outline' onClick={() => window.location.href = '/'}>← Volver al sitio</button>

                    </div>
                </aside>
                <main className="profile-content">
                    {renderContent()}
                </main>
            </div>
            <Footer />
        </>
    );

}
export default ProfilePage;