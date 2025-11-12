import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Children } from "react";


function PrivateRoute({ children }) {

    const { isAuthenticated, loading } = useAuth();

    //verifico el token y muestro cargando...
    if (loading) {
        return (<div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            fontSize: '1.2rem',
            color: '#666'
        }}>
            <p>Cargando...</p>
        </div>);
    }
    //si no esta auntenticado, va a login
    if (!isAuthenticated()) {
        return <Navigate to='/login' replace />;
    } return children;

} export default PrivateRoute;

