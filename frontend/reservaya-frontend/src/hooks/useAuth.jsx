import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//hook para usar el contexto facil
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentrod e un AuthProvider');
    }
    return context;
}