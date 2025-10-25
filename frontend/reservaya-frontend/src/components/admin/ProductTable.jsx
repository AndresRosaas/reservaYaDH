import { useState, useEffect } from "react";
import './ProductTable.css';
import api from '../../services/api';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los productos.');
            console.error('Error: ', err);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setshowDeleteModal(true);
    };
    const handleCancelDelete = () => {
        setProductToDelete(null);
        setshowDeleteModal(false);
    };
    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/products/${productToDelete.id}`);
            setshowDeleteModal(false);
            setProductToDelete(null);
            fetchAllProducts();
            alert('Producto eliminado con éxito.');
        } catch (err) {
            alert('Error al eliminar el producto.');
            console.error('Error: ', err);
        }
    };
    const formatPrice = (price, currency) => {
        if(price == null || isNaN(price)) return '';
        const formatted = price.toLocaleString('es-ES',{ minimumFractionDigits: 2,
        maximumFractionDigits: 2});

        
        return `${currency} ${formatted}`;
    };
    if (loading) {
        return <div>Cargando productos...</div>;
    }
    if (error) {
        return(
        <div className="error">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchAllProducts}>Reintentar</button>
        </div>
        );
    }
    if (products.length === 0) {
        return <div className="product-table-empty">
            <p>No hay productos disponibles.</p></div>;
    }
    return (
        <>
        <div className="product-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Ubicacion</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category ? product.category.name : 'Sin Categoria'}</td>
                            <td>{product.location || 'Sin Ubicacion'}</td>
                            <td>{formatPrice(product.price, product.currency)}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(product)}>🗑️ Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            {/* Delete Confirmacion Modal */}
        {showDeleteModal && (
            <div className="modal-overlay" onClick={handleCancelDelete}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Confirmar Eliminación</h3>
                    <p>¿Estás seguro de que deseas eliminar el producto "{productToDelete.name}"?</p>
                    <p className="modal-warning">Esta accion no se puede deshacer</p>
                    <div className="modal-actions">
                        <button className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
                        <button className="btn btn-danger" onClick={handleConfirmDelete}>Eliminar</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
export default ProductTable;
