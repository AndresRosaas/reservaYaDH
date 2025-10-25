import './AdminPage.css';
import{ useEffect, useState } from 'react';
import AdminPanel from '../components/admin/AdminPanel'

const AdminPage = () => {
    //Tengo que ver si es celular o no
    const [isMobile, setIsMobile] = useState(false);
    //UseEffect para ver el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);//verifico el tamaño
        };
        //ejecuto la funcion al cargar
        handleResize();
        //Escucho el resize
        window.addEventListener('resize', handleResize);
        return () => 
            window.removeEventListener('resize', handleResize);
        }, []);
    
        //Si es movil o no
        if(isMobile){
            return (
                <div className='admin-mobile-message'>
                    <div>
                        <h1>🖥️Panel de administracion</h1>
                        <p>Seccion unicamente disponible para dispositivos de escritorio</p>
                        <p>Por favor accede desde una compu para gestionar los productos.</p>
                        <button className='btn btn-primary' onClick={()=> window.location.href = '/'}>Volver a inicio</button>
                    </div>
                </div>
            );
        }
    //Si es compu muestro el panel
    return (
        <div className="admin-page">
            <div className='admin-header'>
                <h1>Panel de administacion</h1>
                <button className='btn btn-outline'onClick={()=> window.location.href = '/'}>
                    ← Volver al sitio
                </button>
            </div>
            <AdminPanel />
        </div>
    );
            



};
export default AdminPage;
