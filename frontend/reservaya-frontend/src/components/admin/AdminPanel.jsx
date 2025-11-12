import { useEffect, useState } from "react";
import './AdminPanel.css';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import CategoryForm from './CategoryForm';
import CategoryTable from './CategoryTable';
import FeatureForm from './FeatureForm';
import FeatureTable from './FeatureTable';
import UserTable from "./UserTable";

//componente principal del panel de administracion
const AdminPanel = ({ currentSection }) => {

    const [currentView, setCurrentView] = useState('list');
    //estado para recargar la pagina cuando se agrega o elimina un producto
    const [refresh, setRefresh] = useState(0);
    const [editingItem, setEditingItem] = useState(null);

    //cuando cambio de seccion, reseteo la vista
    useEffect(() => {
        setCurrentView('list');
        setEditingItem(null);
    }, [currentSection]);

    //Funcion para volver al menu
    const handleBackToList = () => {
        setCurrentView('list');
        setEditingItem(null);
    };
    //funcion para cuando se agrega un producto exitosamente
    const handleAdd = () => {
        setCurrentView('add');
        setEditingItem(null);
    };
    //funcion para cuando se elimina un producto exitosamente
    const handleProductDeleted = () => {
        setRefresh((prev) => prev + 1);
    };
    const handleEdit = (item) => {
        setCurrentView('edit');
        setEditingItem(item);
    };

    const handleSuccess = () => {
        setRefresh((prev) => prev + 1);
        setCurrentView('list');
        setEditingItem(null);

    }

    //PRODUCTOS
    if (currentSection === 'products') {
        if (currentView === 'add') {
            return (
                <div className="admin-panel">
                    <div className="admin-view">
                        <div className="admin-view-header">
                            <h2>➕ Agregar Producto</h2>
                            <button className="btn btn-outline" onClick={handleBackToList}>
                                ← Volver a lista
                            </button>
                        </div>
                        <ProductForm onSuccess={handleSuccess} />
                    </div>
                </div>
            );
        }
        //vista para agregar productos
        if (currentView === 'edit' && editingItem) {
            return (
                <div className="admin-panel">
                    <div className="admin-view">
                        <div className="admin-view-header">
                            <h2>✏️ Editar Producto</h2>
                            <button className="btn btn-outline" onClick={handleBackToList}>← Volver al menu</button>
                        </div>
                        <ProductForm
                            product={editingItem}
                            onSuccess={handleSuccess}
                            onCancel={handleBackToList} />

                    </div>
                </div>
            );
        }
        return (
            <div className="admin-panel">
                <div className="admin-view">
                    <div className="admin-view-header">
                        <h2>📦 Lista de Productos</h2>
                        <button className="btn btn-primary" onClick={handleAdd}>+ Agregar Producto</button>
                    </div>
                    <ProductTable refresh={refresh} onDelete={handleProductDeleted} onEdit={handleEdit} />
                </div>
            </div>
        );
    }
    //CATEGORIAS
    if (currentSection === 'categories') {
        if (currentView === 'add') {
            return (
                <div className="admin-panel">
                    <div className="admin-view">
                        <div className="admin-view-header">
                            <h2>➕ Agregar Categoria</h2>
                            <button className="btn btn-outline" onClick={handleBackToList}>
                                ← Volver a lista
                            </button>
                        </div>
                        <CategoryForm onSuccess={handleSuccess} />
                    </div>
                </div>
            );
        }
        //vista para agregar categorias
        if (currentView === 'edit' && editingItem) {
            return (
                <div className="admin-panel">
                    <div className="admin-view">
                        <div className="admin-view-header">
                            <h2>✏️ Editar Categoria</h2>
                            <button className="btn btn-outline" onClick={handleBackToList}>← Volver al menu</button>
                        </div>
                        <CategoryForm
                            category={editingItem}
                            onSuccess={handleSuccess}
                            onCancel={handleBackToList} />

                    </div>
                </div>
            );
        }
        return (
            <div className="admin-panel">
                <div className="admin-view">
                    <div className="admin-view-header">
                        <h2>📦 Lista de Categorias</h2>
                        <button className="btn btn-primary" onClick={handleAdd}>+ Agregar Categoria</button>
                    </div>
                    <CategoryTable refresh={refresh} onDelete={handleProductDeleted} onEdit={handleEdit} />
                </div>
            </div>
        );
    }
    //CARACTERISTICAS
    if (currentSection === 'features') {
        if (currentView === 'add') {
            return (
                <div className="admin-panel">
                    <div className="admin-view">
                        <div className="admin-view-header">
                            <h2>➕ Agregar Caracteristica</h2>
                            <button className="btn btn-outline" onClick={handleBackToList}>
                                ← Volver a lista
                            </button>
                        </div>
                        <FeatureForm onSuccess={handleSuccess} />
                    </div>
                </div>
            );
        }
        //vista para agregar categorias
        if (currentView === 'edit' && editingItem) {
            return (
                <div className="admin-panel">
                    <div className="admin-view">
                        <div className="admin-view-header">
                            <h2>✏️ Editar Caractertistica</h2>
                            <button className="btn btn-outline" onClick={handleBackToList}>← Volver al menu</button>
                        </div>
                        <FeatureForm
                            feature={editingItem}
                            onSuccess={handleSuccess}
                            onCancel={handleBackToList} />

                    </div>
                </div>
            );
        }
        return (
            <div className="admin-panel">
                <div className="admin-view">
                    <div className="admin-view-header">
                        <h2>📦 Lista de Categorias</h2>
                        <button className="btn btn-primary" onClick={handleAdd}>+ Agregar Caracteristica</button>
                    </div>
                    <FeatureTable refresh={refresh} onDelete={handleProductDeleted} onEdit={handleEdit} />
                </div>
            </div>
        );
    }
    if (currentSection === 'users') {
        return (
            <div className="admin-panel">
                <div className="admin-view">
                    <div className="admin-view-header">
                        <h2>👤 Lista de usuarios</h2>
                    </div>
                    <UserTable />
                </div>
            </div>
        );
    }
};

export default AdminPanel;


