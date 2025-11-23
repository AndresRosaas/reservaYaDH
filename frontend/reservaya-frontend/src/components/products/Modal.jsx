import './Modal.css';

export default function Modal({message, onConfirm, onCancel}){
    return(
        <div className='modal-overlay'>
            <div className='modal-container'>
                <p>{message}</p>
                <div className='modal-actions'>
                    <button onClick={onConfirm} className='btn btn-primary'>Aceptar</button>
                    <button onClick={onCancel} className='btn btn-secondary'>Cancelar</button>
                </div>
            </div>
        </div>
    );
}