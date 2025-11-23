import './Reservations.css';

function ReservationStatusBadge ({status}) {
    const getStatusConfig = () => {
        switch(status?.toLowerCase()){
            case 'confirmed' :
                return{
                    label: 'Confirmada',
                    icon: '✓',
                    className: 'status-confirmed'
                };
            case 'pending' :
                return{
                    label: 'Pendiente',
                    icon: '⏳',
                    className: 'status-pending'
                };
            case 'cancelled' :
                return{
                    label: 'Cancelada',
                    icon: 'X',
                    className: 'status-cancelled'
                };
            case 'completed' :
                return{
                    label: 'Completada',
                    icon: '✓',
                    className: 'status-completed'
                };
            default :
            return{
                label: status || `Desconocido`,
                icon: '•',
                className : 'status-unknown'
            };
        }
    };

    const config = getStatusConfig();

    return(
        <span className={`reservation-status-badge ${config.className}`}>
            <span className='status-icon'>{config.icon}</span>
            <span className='status-label'>{config.label}</span>
        </span>
    );
}
export default ReservationStatusBadge;