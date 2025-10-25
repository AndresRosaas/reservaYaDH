import { useState, useEffect } from "react";
import './ProductForm.css';
import api from '../../services/api';

//Formulario para agregar productos
const ProductForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        price: '',
        currency: 'ARS',
        categoryId: '',
        imageUrls: ['']
    });
    //Estado para las categorias que esten disponibles
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //UseEffect para cargar las categorias disponibles al cargar el componente
    useEffect(() => {
        fetchCategories();
    }, []);
    //Funcion para obtener las categorias desde la API
    const fetchCategories = async () => {
        try {
            const response = await api.get('/category');
            setCategories(response.data);
        } catch (err) {
            console.error('Error al cargar categorias: ', err);
            //puede avanzar sin categorias
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleImageChange = (index, value) => {
        const newImageUrls = [...formData.imageUrls];
        newImageUrls[index] = value;
        setFormData((prev) => ({
            ...prev,
            imageUrls: newImageUrls
        }));
    };
    const handleAddImageField = () => {
        setFormData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, '']
        }));
    };
    const handleRemoveImageField = (index) => {
        const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            imageUrls: newImageUrls
        }));
    }
   

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('El nombre del producto es obligatorio.');
            return false;
        }
        if (!formData.description.trim()) {
            setError('La descripción del producto es obligatoria.');
            return false;
        }
        if (!formData.location.trim()) {
            setError('La ubicación del producto es obligatoria.');
            return false;
        }
        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            setError('El precio del producto debe ser un número positivo.');
            return false;
        }
        const validImages = formData.imageUrls.filter(url => url.trim() !== '');
        if (validImages.length === 0) {
            setError('Debe agregar al menos una URL de imagen válida.');
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);
            const validImages = formData.imageUrls.filter(url => url.trim() !== '');
            //preparo los datos para enviar a la API
            const productData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                location: formData.location.trim(),
                price: parseFloat(formData.price),
                currency: formData.currency,
                imageUrls: validImages,
                mainImageUrl: validImages[0] || '' 
            };
            //m,e falta sumar la categoria
            if (formData.categoryId) {
                productData.categoryId = parseInt(formData.categoryId) ;
            }

            console.log('📤 Enviando al backend:', JSON.stringify(productData, null, 2));
            //Envio los datos a la API
            const response = await api.post('/products', productData);
            console.log('📥 Respuesta del backend:', response.data);

            //const response = console.log('📥 Respuesta del backend:', response.data);

            //Limpio el formulario
            setFormData({
                name: '',
                description: '',
                location: '',
                price: '',
                currency: 'ARS',
                categoryId: '',
                imageUrls: ['']
            });


            //Si todo va bien, llamo al onSuccess para notificar al padre
            onSuccess();
            
        } catch (err) {
            if (err.response?.data?.includes('Ya existe un producto')) {
                setError('Ya existe un producto con ese nombre.');
            } else {
                setError('Error al crear el producto. Intente nuevamente.');
            } console.error('Error al crear producto: ', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            {/*Nombre*/}
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: Casa de campo"
                    disabled={loading}
                    maxLength={50}
                />
            </div>
            {/*Descripcion*/}
            <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Ej: Hermosa casa de campo ubicada en..."
                    disabled={loading}
                    maxLength={2000}
                />
            </div>
            {/*Ubicacion*/}
            <div className="form-group">
                <label htmlFor="location">Ubicación:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ej: Buenos Aires, Argentina"
                    disabled={loading}
                    maxLength={100}
                />
            </div>
            {/*Categoria (opcional)*/}
            {categories.length > 0 && (
                <div className="form-group">
                    <label htmlFor="categoryId">Categoría:</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        disabled={loading}
                    >
                        <option value="">-- Seleccione una categoría --</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            )}
            {/*Precioy moneda*/}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="price">Precio:</label>
                    <input
                        className="price-input"
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currency">Moneda:</label>
                    <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        disabled={loading}
                    >

                        <option value="ARS"> ARS (Peso Argentino)</option>
                        <option value="USD"> USD (Dólar Estadounidense)</option>
                        <option value="EUR"> EUR (Euro)</option>
                    </select>
                </div>
            </div>
            {/*Imagenes*/}
            <div className="form-group">
                <label>URLs de Imágenes:</label>
                {formData.imageUrls.map((image, index) => (
                    <div key={index} className="image-input-group">
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Ej: https://ejemplo.com/imagen.jpg"
                            disabled={loading}
                        />
                        {formData.imageUrls.length > 1 && (
                            <button
                                type="button"
                                className="btn-remove-image"
                                onClick={() => handleRemoveImageField(index)}
                                disabled={loading}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="btn-add-outline"
                    onClick={handleAddImageField}
                    disabled={loading}
                >
                    + Agregar otra imagen
                </button>
            </div>
            {/*Error*/}
            {error && <div className="form-error">{error}</div>}
            {/*Submit*/}
            <div className="form-action">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Producto'}
                </button>
            </div>
        </form>
    );
};
export default ProductForm;

