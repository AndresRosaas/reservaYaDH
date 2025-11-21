import './Header.css';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);

    //UseEffect para cerrar si se toca afuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMenu && !e.target.closest('.user-menu')) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showMenu]);

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        navigate('/');
    };
    const handleLogoClick = () => {
        navigate('/');
    };


    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo" onClick={handleLogoClick}>
                    <div className="logo-icon">R</div>
                    <div className="logo-text">
                        <h1>ReservaYa</h1>
                        <p>Reservá fácil. Viajá tranquilo.</p>
                    </div>
                </div>
                <div className='header-buttons'>
                    {/* si no esta autenticado*/}
                    {!isAuthenticated() ? (
                        <>
                            <button className="btn btn-outline" onClick={() => navigate('/registro')}>Crear cuenta</button>
                            <button className="btn btn-outline" onClick={() => navigate('/login')}>Iniciar sesión</button>
                        </>
                    ) : (
                        // si SI esta autenticado
                        < div className='user-menu'>
                            <button onClick={toggleMenu} className='user-avatar'>
                                <span className='avatar-initials'>{user.firstName[0]}{user.lastName[0]}</span>
                            </button>


                            {showMenu && (
                                <div className='dropdown-menu'>
                                    <div className='dropdown-header'>
                                        <p className='user-fullname'>Hola {user.firstName} {user.lastName}</p>
                                    </div>
                                    <button onClick={() => navigate('/perfil')} disabled>
                                        👤 Mi Perfil (Proximamente)
                                    </button>
                                    <button onClick={() => navigate('/mis-reservas')} disabled>
                                        📋 Mis Reservas (Proximamente)
                                    </button>
                                    <button onClick={() => navigate('/favoritos')} >
                                        ⭐ Favoritos
                                    </button>
                                    {/**Solo si es admin */}
                                    {isAdmin() && (
                                        <>
                                            <div className='dropdown-divider'></div>
                                            <button onClick={() => navigate('/administracion')}>⚙️ Admin</button>
                                        </>
                                    )}
                                    <div className='dropdown-divider'></div>
                                    <button onClick={handleLogout}>🚪 Cerrar sesión</button>
                                </div>
                            )}
                        </div>

                    )}
                </div>
            </div>

        </header >
    );
}
export default Header;