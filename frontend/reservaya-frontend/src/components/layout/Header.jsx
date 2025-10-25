import './Header.css';

const Header = () => {
    const handleLogoClick = () => {
        window.location.href = '/';
    };
    const handleAdminClick = () => {
        window.location.href = '/administracion';
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
                    {/* Botón de administrador temporal*/}
                    <button className="btn btn-outline">Crear cuenta</button>
                    <button className="btn btn-outline">Iniciar sesión</button>
                    <button className="btn btn-outline" onClick={handleAdminClick} title="Panel de administración">⚙️ Admin</button>
                </div>
            </div>
        </header>
    );
};
export default Header;