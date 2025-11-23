import { useState, useEffect } from "react";
import api from '../../services/api';
import './AdminPanel.css';
import { toast } from "react-toastify";
import Modal from '../products/Modal';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [selectedUserNames, setSelectedUserNames] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
            setError(null)
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
            setError('Error al cargar los usuarios.')
        } finally {
            setLoading(false);
        }
    };



    const handletoggleRole = (userId, currentRole, firstName, lastName) => {
        //Determino el nuevo rol
        const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
        //Confirmacion
        const confirmationText = currentRole === 'ADMIN'
            ? '¿Estas seguro de quitar permisos de administrador a este usuario?'
            : '¿Estas seguro de otorgar permisos de administrador a este usuario?';

        setModalMessage(confirmationText);
        setSelectedUserNames(`${firstName} ${lastName}`);
        setPendingAction({ userId, newRole });
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        const { userId, newRole } = pendingAction;

        try {
            setLoading(true)
            //llamo al endpoint para actualizar el nuevo rol
            await api.put(`/users/${userId}/role?role=${newRole}`);
            loadUsers();
            toast.success(`Rol actualizado correctamente a ${newRole}`);
        } catch (err) {
            toast.warning('Error al cambiar el rol');
            console.error('Error al cambiar el rol: ', err);

        } finally { setModalOpen(false); setPendingAction(null); setLoading(false); }

    };
    if (loading) {
        return <div className="loading-spinner">Cargando...</div>;
    }
    if (error) {
        return (<div className="error-message">
            <p>{error}</p>
            <button className="btn btn-outline" onClick={loadUsers}>Reintentar</button>
        </div>
        );
    }
    return (

        <div className="admin-table-container">
            {modalOpen && (
                <Modal
                message={`${modalMessage} para ${selectedUserNames}`}
                onConfirm={handleConfirm}
                onCancel={()=>setModalOpen(false)}
                />
            )}

            <table className="admin-table">
                <thead className="admin-table-thead">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td className="empty-state" colSpan="5">
                                No hay usuarios registrados
                            </td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td className="actions">
                                    <span className={`role-badge ${user.role}`}>
                                        {user.role === 'ADMIN' ? '👑 Admin' : '👤 Usuario'}

                                    </span>
                                </td>
                                <td className="user-actions">
                                    {user.role === 'USER' ? (
                                        <button
                                            className="btn btn-primary"
                                             onClick={() => handletoggleRole(user.id, 
                                                user.role, 
                                                user.firstName,
                                                user.lastName)}
                                            disabled={loading}
                                        >
                                            👑 Hacer Admin
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handletoggleRole(user.id, 
                                                user.role, 
                                                user.firstName,
                                                user.lastName)}
                                            disabled={loading}
                                        >
                                            👤 Quitar Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

    );
} export default UserTable;