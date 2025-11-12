import { useState, useEffect } from "react";
import api from '../../services/api';
import './AdminPanel.css';
import { availableIcons } from "../layout/icons";

//formulario para agregar productos
const FeatureForm = ({ feature = null, onCancel, onSuccess }) => {

    const [formData, setFormData] = useState({
        name: feature?.name || '',
        icon: feature?.icon || ''
    });

    const isEditMode = feature !== null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (feature) {
            setFormData({
                name: feature.name,
                icon: feature.icon
            });
        }
    }, [feature]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //valido los campos
    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('El nombre es obligatorio.');
            return false;
        }
        if (!formData.icon.trim()) {
            setError('El icono es obligatorio.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        //si no se valida el formulario no hace nada
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);
            if (isEditMode) {
                const featureData = {
                    name: formData.name.trim(),
                    icon: formData.icon.trim()
                };

                await api.put(`/features/${feature.id}`, featureData);
            } else {
                const featureData = {
                    name: formData.name.trim(),
                    icon: formData.icon.trim()
                };
                const response = await api.post('/features', featureData);

            }
            //limpio el formulario
            setFormData({
                name: '',
                icon: ''
            });

            //llamo a onSuccess para notificar
            onSuccess();
        } catch (err) {
            if (err.response?.data?.includes('Ya existe una caracteristica.')) {
                setError('Ya existe una caracteristica con ese nombre.');
            } else {
                setError('Error al crear la caracteristica. Intente nuevamente.');
            } console.error('Error al crear la caracteristica ', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="WIFI"
                    disabled={loading}
                    maxLength={50}
                />
            </div>
            <div className="form-group">
                <label htmlFor="icon">Icono:</label>
                <select 
                name="icon" 
                id="icon"
                value={formData.icon}
                onChange={handleInputChange}
                disabled={loading}
                >
                    <option value=""> --Seleccione un icono--</option>
                    {Object.entries(availableIcons).map(([key, {component: IconComp, label}]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                <p className="input-hint">Selecciona el icono que represente a la caracteristica.</p>
            </div>

            {/*Error*/}
            {error && <div className="form-error">{error}</div>}
            {/*Submit*/}
            <div className="form-action">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {isEditMode ? 'Actualizar' : 'Crear'} Caracteristica
                </button>
                {isEditMode && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                )}
            </div>

        </form>
    );
};
export default FeatureForm;