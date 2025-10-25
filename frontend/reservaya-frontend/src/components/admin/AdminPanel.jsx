import { useState } from "react";
import './AdminPanel.css';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

//componente principal del panel de administracion
const AdminPanel = () => {
    //Estado para saber que vista mostrar
    //'menu' | 'add' | 'List'
    const[currentView, setCurrentView] = useState('menu');
    //estado para recargar la pagina cuando se agrega o elimina un producto
    const[refresh, setRefresh] = useState(0);

    //Funcion para volver al menu
    const handleBackToMenu = () => {
        setCurrentView('menu');
    };
    //funcion para cuando se agrega un producto exitosamente
    const handleProductAdded = () => {
        setRefresh((prev) => prev + 1);
        setCurrentView('List');
    };
    //funcion para cuando se elimina un producto exitosamente
    const handleProductDeleted = () => {
        setRefresh((prev) => prev + 1);
    };

    //vista menu principal
    if (currentView === 'menu') {
        return (
            <div className="admin-panel">
                <div className="admin-menu">
                    <h2>Que deseas hacer?</h2>
                    <div className="admin-menu-cards">
                        <div className="admin-menu-card" onClick={()=>(setCurrentView('add'))}>
                            <div className="admin-menu-card-icon">➕</div>
                            <h3>Agregar producto</h3>
                            <p>Crear un nuevo producto en el catalogo</p>
                        </div>
                        {/*Card para lsitar productos*/}
                        <div className="admin-menu-card" onClick={()=>(setCurrentView('List'))}>
                            <div className="admin-menu-card-icon">📋</div>
                            <h3>Listar productos</h3>
                            <p>Ver, editar o eliminar productos existentes</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    //vista para agregar productos
    if (currentView === 'add') {
        return (
            <div className="admin-panel">
                <div className="admin-view">
                    <div className="admin-view-header">
                        <h2>Agregar Producto</h2>
                        <button className="btn btn-outline" onClick={handleBackToMenu}>← Volver al menu</button>
                    </div>
                    <ProductForm onSuccess={handleProductAdded} />

                    </div>
                </div>
        );
    }
    //vista para listar productos
    if (currentView === 'List') {
        return (
            <div className="admin-panel">
                <div className="admin-view">
                    <div className="admin-view-header">
                        <h2>Lista de Productos</h2>
                        <button className="btn btn-outline" onClick={handleBackToMenu}>← Volver al menu</button>
                    </div>  
                    <ProductTable refresh={refresh} onDelete={handleProductDeleted} />
                </div>
            </div>
        );
    }
};

export default AdminPanel;
        

