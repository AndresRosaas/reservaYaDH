import './SearchBar.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { es } from 'date-fns/locale/es';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import api from '../../services/api';


const SearchBar = () => {
    const navigate = useNavigate();
    const calendarRef = useRef(null);

    //estados
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([{
        startDate: null,
        endDate: null,
        key: 'selection'
    }
    ]);

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutSide);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, [showCalendar]);


    const handleLocationChange = async (e) => {
        //logica para autocompletar ubicacion
        const value = e.target.value;
        setLocation(value);

        if (value.length >= 2) {
            try {
                //llamo al backend para las sugerencias
                const response = await api.get(`/products/locations?search=${value}`);
                const data = Array.isArray(response.data) ? response.data : [];

                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error al buscar ubicaciones: ', error);
                //sugerencias de ejemplo por si falla el back
                const exampleSuggestions = [
                    'Buenos Aires, Argentina',
                    'Córdoba, Argentina',
                    'Mendoza, Argentina',
                    'Bariloche, Argentina',
                    'Mar del Plata, Argentina',
                    'Lobos, Argentina'
                ].filter(city => city.toLowerCase().includes(value.toLowerCase()));
                setSuggestions(exampleSuggestions);
                setShowSuggestions(exampleSuggestions.length > 0);

            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };
    const selectSuggestion = (suggestions) => {
        setLocation(suggestions);
        setShowSuggestions(false);
    };

    //formatear rango de fechas
    const formatDateRange = () => {
        const { startDate, endDate } = dateRange[0];

        if (!endDate || !startDate) {
            return 'Seleccionar fechas';
        }
        if (!endDate || !startDate === endDate) {
            return `Desde ${startDate.toLocaleDateString('es-ED', { day: 'numeric', month: 'short' })}`;
        }
        const start = startDate.toLocaleDateString('es-ED', { day: 'numeric', month: 'short' });
        const end = endDate.toLocaleDateString('es-ED', { day: 'numeric', month: 'short' });

        return `${start} - ${end}`;
    };

    const calculateNights = () => {
        const { startDate, endDate } = dateRange[0];

        if (!endDate || !startDate) return null;

        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights : null;
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const { startDate, endDate } = dateRange[0];
        //validacion
        if (!startDate || !endDate) {
            alert('Por favor selecciona fechas de entrada y de salida');
            return;
        }

        //construiir la query params
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        params.append('checkIn', startDate.toISOString().split('T')[0]);
        params.append('checkOut', endDate.toISOString().split('T')[0])

        navigate(`/busqueda?${params.toString()}`);
    };

    const nights = calculateNights();


    return (
        <div className='search-bar'>
            <div className='search-bar-content'>
                <h2 className='search-bar-title'>Busca tu proxima aventura</h2>
                <p className='search-bar-subtitle'>Busca por ubicacion y fechas disponibles</p>
                <form className='search-bar-form' onSubmit={handleSearch}>

                    <div className='search-field'>{/*campo de ubicacion busqueda*/}
                        <label htmlFor="search-location">¿Donde Queres ir?</label>
                        <div className='autocomplete-wrapper'>
                            <input
                                type="text"
                                id='search-location'
                                placeholder='Ciudad, barrio o lugar...'
                                value={location}
                                onChange={handleLocationChange}
                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                autoComplete='off'

                            />
                            {showSuggestions &&suggestions && suggestions.length > 0 && (
                                <ul className='suggestions-list'>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => selectSuggestion(suggestion)}>
                                            📍 {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className='search-field date-range-field' ref={calendarRef}>{/*campo de fechas check in */}
                        <label>Fechas</label>
                        <button
                            type='button'
                            className='date-range-button'
                            onClick={() => setShowCalendar(!showCalendar)}
                        >
                            📅{formatDateRange()}
                            {nights && <span className='nights-badge'>{nights}N</span>}
                        </button>
                        {showCalendar && (
                            <div className='calendar-dropdown'>
                                <DateRangePicker
                                    onChange={item => setDateRange([item.selection])}
                                    showSlectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={dateRange}
                                    direction='horizontal'
                                    minDate={new Date()}
                                    locale={es}
                                    rangeColors={['#667eea']}
                                    showDateDisplay={false}
                                    staticRanges={[]}
                                    inputRanges={[]}
                                />
                                <div className='calendar-actions'>
                                    <button
                                        type='button'
                                        className='btn-text'
                                        onClick={() => {
                                            setDateRange([{
                                                startDate: null,
                                                endDate: null,
                                                key: 'selection'
                                            }]);
                                        }}
                                    >
                                        Limpiar
                                    </button>
                                    <button
                                        type='button'
                                        className='btn-primary'
                                        onClick={() => setShowCalendar(false)}
                                    >
                                        Aplicar
                                    </button>

                                </div>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary search-btn" >🔍 Buscar</button>
                </form>
            </div>
        </div>
    );
};
export default SearchBar;