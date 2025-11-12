import { useState, useEffect } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import api from '../../services/api';
import './AdminPanel.css';

function CategoryTable({refresh, onEdit, onDelete}){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showDeleteModal, setshowDeleteModal] = useState(false);

    useEffect(() => {
        loadCategories();
    },[refresh]);
    const loadCategories = async () => {
        try{
            setLoading(true);
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error){
            console.error('Error al cargar las categorias:' , error);
        }finally{
            setLoading(false);
        }
    };

    const handleDeleteClick= (category) => {
        setCategoryToDelete(category);
        setshowDeleteModal(true);
    }

     const handleCancelDelete = () => {
        setCategoryToDelete(null);
        setshowDeleteModal(false);
    };
    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/categories/${categoryToDelete.id}`);
            setshowDeleteModal(false);
            setCategoryToDelete(null);
            onDelete();
            alert('Categoria eliminada con éxito.');
        } catch (err) {
            alert('Error al eliminar la categoria.');
            console.error('Error: ', err);
        }
    };
    if(loading){
        return <div className="loading-spinner">Cargando...</div>;
    }
    return(
        <>
        <div className="admin-table-container">
            <table className="admin-table">
                <thead className="admin-table-thead">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length ===0 ? (
                        <tr>
                            <td className="empty-state" colSpan="4">
                                No hay categorias
                            </td>
                        </tr>
                    ) : (
                        categories.map(cat =>(
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>
                                <td>{cat.description}</td>
                                <td className="actions">
                                    <button className="btn btn-outline" onClick={()=> onEdit(cat)}>
                                        ✏️
                                    </button>
                                    <button className="btn btn-danger" onClick={()=> handleDeleteClick(cat)}>
                                        🗑️
                                    </button>

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
            {/* Delete Confirmacion Modal */}
        <DeleteConfirmModal
        show={showDeleteModal}
        itemName={categoryToDelete?.name}
        itemType="el categoria"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        />
        </>
    );
}export default CategoryTable;