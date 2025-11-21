import { useState, useEffect } from "react";
import './AdminPanel.css';
import api from '../../services/api';
import ProductForm from "./ProductForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { toast } from "react-toastify";


const ProductTable = ({ refresh, onEdit, onNavigate }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

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
    const handleEdit = (product) => {
        setEditingProduct(product);
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
            toast.error('Producto eliminado con éxito.');
        } catch (err) {
            toast.error('Error al eliminar el producto.');
            console.error('Error: ', err);
        }
    };
    const formatPrice = (price, currency) => {
        if (price == null || isNaN(price)) return '';
        const formatted = price.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


        return `${currency} ${formatted}`;
    };
    if (loading) {
        return <div>Cargando productos...</div>;
    }
    if (error) {
        return (
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
    if (editingProduct) {
        return (
            <ProductForm
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onSuccess={() => {
                    setEditingProduct(null);
                    fetchAllProducts();
                }}
            />
        );
    }
    return (
        <>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead className="admin-table-thead">
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
                                <td className="actions">
                                    <button className="btn btn-outline" onClick={() => onEdit(product)}>✏️</button>
                                
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(product)}>🗑️</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmacion Modal */}
            <DeleteConfirmModal
                show={showDeleteModal}
                itemName={productToDelete?.name}
                itemType="el producto"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

        </>
    );
}
export default ProductTable;
