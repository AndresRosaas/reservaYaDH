import './AdminPage.css';
import { useEffect, useState } from 'react';
import AdminPanel from '../components/admin/AdminPanel'
import AdminSideBar from '../components/admin/AdminSideBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AdminPage = () => {
    //Tengo que ver si es celular o no
    const [isMobile, setIsMobile] = useState(false);
    const [currentSection, setCurrentSection] = useState('products');
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
    if (isMobile) {
        return (
            <div className='admin-mobile-message'>
                <div>
                    <h1>🖥️Panel de administracion</h1>
                    <p>Seccion unicamente disponible para dispositivos de escritorio</p>
                    <p>Por favor accede desde una compu para gestionar los productos.</p>
                    <button className='btn btn-primary' onClick={() => window.location.href = '/'}>Volver a inicio</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className='admin-layout'>
                <AdminSideBar
                    currentSection={currentSection}
                    onNavigate={setCurrentSection}
                />
                <main className='admin-main'>
                    <AdminPanel currentSection={currentSection} />
                </main>
            </div>
            <Footer />
        </>
    );
}; export default AdminPage;
