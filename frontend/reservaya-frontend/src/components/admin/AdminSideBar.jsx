import './AdminPanel.css';

const AdminSideBar = ({currentSection, onNavigate}) => {
    const menuItems =[
        {id:'products' , label: 'Productos', icon: '📦' },
        {id:'categories' , label: 'Categorias', icon: '🏷️' },
        {id:'features' , label: 'Caracteristicas', icon: '⭐' },
        {id:'users' , label: 'Usuarios', icon: '👤' },
    ];
    return (
        <aside className='admin-sidebar'>
            <div className='sidebar-header'>
                <h2>🖥️ Panel Admin</h2>
            </div>

            <nav className='sidebar-nav'>
                {menuItems.map((item)=>(
                    <button 
                    key={item.id} 
                    className={`sidebar-item ${currentSection === item.id ? 'active' : ''}`}
                    onClick={()=> onNavigate(item.id)}
                    >
                    <span className='sidebar-icon'>{item.icon}</span>                     
                    <span className='sidebar-label'>{item.label}</span>                     
                    </button>
                ))}

            </nav>
            <div className='sidebar-footer'>
                <button className='btn btn-outline' onClick={()=> window.location.href='/'}>← Volver al sitio</button>

            </div>
        </aside>
    );
};
export default AdminSideBar;