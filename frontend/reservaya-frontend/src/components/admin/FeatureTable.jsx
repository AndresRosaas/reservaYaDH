import { useState, useEffect } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import api from '../../services/api';
import './AdminPanel.css';
import { availableIcons } from "../layout/icons";

function FeatureTable({refresh, onEdit, onDelete}){
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [featureToDelete, setFeatureToDelete] = useState(null);
    const [showDeleteModal, setshowDeleteModal] = useState(false);

    useEffect(() => {
        loadFeatures();
    },[refresh]);
    const loadFeatures = async () => {
        try{
            setLoading(true);
            const response = await api.get('/features');
            setFeatures(response.data);
        } catch (error){
            console.error('Error al cargar las categorias:' , error);
        }finally{
            setLoading(false);
        }
    };

   
    const handleDeleteClick= (features) => {
        setFeatureToDelete(features);
        setshowDeleteModal(true);
    }

     const handleCancelDelete = () => {
        setFeatureToDelete(null);
        setshowDeleteModal(false);
    };
    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/features/${featureToDelete.id}`);
            setshowDeleteModal(false);
            setFeatureToDelete(null);
            onDelete();
            alert('Caracteristica eliminada con éxito.');
        } catch (err) {
            alert('Error al eliminar la caracteristica, asegura que no este en uso.');
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
                        <th>Icono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {features.length ===0 ? (
                        <tr>
                            <td className="empty-state" colSpan="4">
                                No hay caracteristicas
                            </td>
                        </tr>
                    ) : (
                        features.map(feat =>(
                            <tr key={feat.id}>
                                <td>{feat.id}</td>
                                <td>{feat.name}</td>
                                <td>{(()=> {
                                    const IconComponent = availableIcons[feat.icon]?.component; 
                                    return IconComponent ? <IconComponent size={24}/> : '❓';})()}</td>
                                <td className="actions">
                                    <button className="btn btn-outline" onClick={()=> onEdit(feat)}>
                                        ✏️
                                    </button>
                                    <button className="btn btn-danger" onClick={()=> handleDeleteClick(feat)}>
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
        itemName={featureToDelete?.name}
        itemType="la caracteristica"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        />
        </>
    );
}export default FeatureTable;