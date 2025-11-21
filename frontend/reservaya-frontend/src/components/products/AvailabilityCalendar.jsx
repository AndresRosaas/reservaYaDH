import { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import es from "date-fns/locale/es";
import { addMonths, eachDayOfInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import './AvailabilityCalendar.css';
import api from "../../services/api";
import { toast } from "react-toastify";


const AvailabilityCalendar = ({ productId, onDateSelect }) => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [disablesDates, setDisablesDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //cargo fechas ocupadas del backend
    useEffect(() => {
        loadAvailability();
    }, [productId]);

    const loadAvailability = async () => {
        try {
            setLoading(true);
            setError(null);

            const startDate = new Date();
            const endDate = addMonths(startDate, 3);

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() +1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2,'0');
                return `${year}-${month}-${day}`;
            }

            const response = await api.get(`/products/${productId}/availability`, {
                params: {
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate)
                }
            });

            
            if (response.data && response.data.unavailableDates) {
                const dates = response.data.unavailableDates.map(dateStr => new Date(dateStr));
                setDisablesDates(dates);
            } else {
                setDisablesDates([]);
            }

        } catch (error) {
            console.error('Error al cargar las fechas no disponibles: ', error);
            setError('No se pudo cargar la disponibilidad, intente nuevamente');
            setDisablesDates([]);
        } finally {
            setLoading(false);
        }

    };

    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;

        //valido que las fechas no esten ocupadas
        const selectedDays = eachDayOfInterval({ start: startDate, end: endDate });
        const hasDisabledDates = selectedDays.some(day =>
            disablesDates.some(disabled =>
                disabled.toDateString() === day.toDateString()
            )
        );
        if (hasDisabledDates) {
            toast.info('Las fechas seleccionadas incluyen dias no disponibles. Por favor ejila otras fechas.');
            return;
        }
        setDateRange([ranges.selection]);
        //notificar al padre
        if (onDateSelect) {
            onDateSelect(ranges.selection);
        }
    };

    //funcion que desabilita fechas
    const isDateDisabled = (date) => {
        return disablesDates.some(disablesDates =>
            disablesDates.toDateString() === date.toDateString()
        );
    };

    const calculateNights = () => {
        const { startDate, endDate } = dateRange[0];

        if (!endDate || !startDate) return 0;

        return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    };

    if (loading) {
        return (
            <div className="avalability-calendar">
                <div className="calendar-loading">
                    <div>"spinner"</div>
                    <p>Cargando disponibilidad...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="availability-calendar">
                <div className="calendar-error">
                    <p>{error}</p>
                    <button className="btn btn-secondary" onClick={loadAvailability}>
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }
    const nights = calculateNights();

    return (
        <div className="availability-calendar">
            <div className="calendar-header">
                <h3>Disponibilidad</h3>
                <p>Selecciona las fechas de tu estadia</p>
            </div>

            <div className="calendar-wrapper">
                <DateRangePicker
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    month={2}
                    ranges={dateRange}
                    direction="horizontal"
                    minDate={new Date()}
                    locale={es}
                    rangeColors={['#667eea']}
                    showDateDisplay={false}
                    staticRanges={[]}
                    inputRanges={[]}
                    disabledDay={isDateDisabled}
                />
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <span className="legend-color available"></span>
                    <span>Disponible</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color occupied"></span>
                    <span>No disponibles</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color selected"></span>
                    <span>Seleccionado</span>
                </div>
            </div>

            {dateRange[0].startDate && dateRange[0].endDate && nights > 0 && (
                <div className="selected-dates-info">
                    <div className="dates-row">
                        <div className="dates-item">
                            <span className="date-label">Check-in</span>
                            <span>
                                {dateRange[0].startDate.toLocaleDateString('es-ES', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </span>
                        </div>
                        <div className="date-separator">→</div>
                        <div className="date-item">
                            <span className="date-label">Check-out</span>
                            <span className="date-value">
                                {dateRange[0].endDate.toLocaleDateString('es-ES',{
                                    weekdat: 'short',
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="nigts-info">
                        <strong>{nights}</strong>{nights === 1 ? 'noche' : 'noches'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailabilityCalendar;