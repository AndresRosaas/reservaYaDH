import { useState, useEffect } from "react";
import api from '../../services/api';
import './AdminPanel.css';

//formulario para agregar productos
const CategoryForm = ({ category = null, onCancel, onSuccess }) => {

    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || ''
    });

    const isEditMode = category !== null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description
            });
        }
    }, [category]);

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
        if (!formData.description.trim()) {
            setError('La descripcion de la categoria es obligatoria.');
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
                //
                await api.put(`/categories/${category.id}`, formData);
            } else {
                const categoryData = {
                    name: formData.name.trim(),
                    description: formData.description.trim()
                };
                const response = await api.post('/categories', categoryData);
                //limpio el formulario

            }
            setFormData({
                name: '',
                description: ''
            });

            //llamo a onSuccess para notificar
            onSuccess();
        } catch (err) {
            if (err.response?.data?.includes('Ya existe una categoria.')) {
                setError('Ya existe una categoria con ese nombre.');
            } else {
                setError('Error al crear la categoria. Intente nuevamente.');
            } console.error('Error al crear la categoria ', err);
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
                    placeholder="Casa de campo"
                    disabled={loading}
                    maxLength={50}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Despcripcion:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Casa de Alojamiento completo con cocina y terraza, ideal para familias"
                    disabled={loading}
                    maxLength={50}
                />
            </div>
            {/*Error*/}
            {error && <div className="form-error">{error}</div>}
            {/*Submit*/}
            <div className="form-action">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {isEditMode ? 'Actualizar' : 'Crear'} Categoria
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
export default CategoryForm;