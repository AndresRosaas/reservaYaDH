const DeleteConfirmModal = ({
    show,
    itemName,
    itemType = 'elemento',
    onConfirm,
    onCancel
}) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Confirmar eliminacion</h3>
                <p>
                    ¿Estás seguro que deseas eliminar {itemType}
                    <strong>"{itemName}"</strong>
                </p>
                <p className="modal-warning">Esta accion no se puede deshacer</p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Eliminar
                    </button>
                </div>
            </div>

        </div>
    );
};
export default DeleteConfirmModal;