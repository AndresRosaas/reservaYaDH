import { children, createContext, useEffect, useState } from "react";
import api from '../services/api';

//creo el contexto
export const AuthContext = createContext();

//Creo el rpovider que envuelve la app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //Arranca vacio el usuario
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); //Muestra el cargando mienstras se verifica el token

    //Miro si hay token en la app cuando cargo
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');

        if (storedToken && storedUser) {
            try{
                const parsedUser = JSON.parse(storedUser);
                 setToken(storedToken);
            setUser(parsedUser);

            //configurar axios para que use el token en todas las peticiones
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }catch (e){
                console.error("error parsing stored user: ", e);
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
            }
           
        }
        setLoading(false);
    }, []);

    // funcion para login
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            //guardo el session storage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));

            //actualizo el usestate
            setToken(token);
            setUser(user);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true };
        } catch (error) {
            console.error('Error en el login', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Error al iniciar sesion'
            };
        }
    };
    //funcion para regstar al usuario
    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            const { token, user } = response.data;
            //guardo el session storage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));

            //actualizo el usestate
            setToken(token);
            setUser(user);
            // configuro axios 
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true };
        } catch (error) {
            console.error('Error en el login', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Error al registrarse'
            };
        }
    }

    //funcion para cerrar sesion
    const logout = () => {
        //limpiar sessionstorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        //limpio el estado
        setToken(null);
        setUser(null);

        //limpiar el header del axios
        delete api.defaults.headers.common['Authorization'];
    };

    //Verifico si es admin
    const isAdmin = () => {
        return user?.role === 'ADMIN';
    };

    //verifico si esta autenticado
    const isAuthenticated = () => {
        return !!token && !!user;
    };

    //valor que se comparte en el contexto
    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isAuthenticated
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};