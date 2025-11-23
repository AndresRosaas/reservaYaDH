import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated() && user) {
            loadFavorites();

        }

    }, [isAuthenticated, user?.id]);

    const loadFavorites = async () => {
        if (!user?.id) {
            setFavorites([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await api.get(`/users/${user.id}/favorites`);
            setFavorites(response.data);
        } catch (error) {
            console.error("Error al cargar favoritos: ", error);
            setFavorites([]);
        } finally {
            setLoading(false);
        }

    };

    const addFavorite = async (productId) => {
        if (!user?.id) {
            console.error("Usuario no autenticado");
            return { success: false, message: "Usuario no autenticado" };
        }

        try {
            setLoading(true);
            const response = await api.post(`/users/${user.id}/favorites/${productId}`);
            console.log('favorito agregado...', response.data);
            await loadFavorites();
            return { success: true };

        } catch (error) {
            console.error('Error al agregar a favoritos: ', error);
            setFavorites(prev => prev.filter(p => p.id !== productId));
            return { success: false, message: 'Error al agregar a favoritos' };

        } finally {
            setLoading(false);
        }

    };
    const removeFavorite = async (productId) => {
        if (!user?.id) return { success: false, message: "usuario no encontrado" };

        try {
            setLoading(true);
            setFavorites(prev => prev.filter(p => p.id !== productId));
            const response = await api.delete(`/users/${user.id}/favorites/${productId}`);
            console.log('✅ Eliminado de favoritos:', response.data);
            await loadFavorites();
            return { success: true };
        } catch (error) {
            console.error("Error al eliminar de favoritos: ", error);
            await loadFavorites();
            return { success: false };
        } finally {
            setLoading(false);
        }

    };

    const isFavorite = (productId) => {
        if(!favorites || favorites.length === 0) return false;
        return favorites.some(p=> String(p.id) === String(productId));
    };

    const toggleFavorite = async (productId) => {
        if (isFavorite(productId)) {
            console.log('🗑️ Removiendo...');
            return await removeFavorite(productId);
        } else {
            console.log('➕ Agregando...');
            return await addFavorite(productId);
        }
    };
    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                loading,
                addFavorite,
                removeFavorite,
                isFavorite,
                toggleFavorite,
                loadFavorites
            }}
        >
            {children}
        </FavoritesContext.Provider>

    );

};