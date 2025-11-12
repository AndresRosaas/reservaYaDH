import './SearchBar.css';

//componente solo visual para cumplir el sprint1
const SearchBar = () => {
    return (
        <div className='search-bar'>
            <div className='search-bar-content'>
                
                <p className='search-bar-subtitle'>Busca por ubicacion y fechas disponibles</p>
                <div className='search-bar-form'>
                    <div className='search-field'>{/*campo de ubicacion busqueda*/}
                        <label htmlFor="search-location">¿Donde Queres ir?</label>
                        <input
                            type="text"
                            id='search-location'
                            placeholder='Ciudad, barrio o lugar...'
                            disabled
                        />
                    </div>
                    <div className='search-field'>{/*comop de fechas check in */}
                        <label htmlFor="search-checkin">Fecha de entrada</label>
                        <input
                            type="text"
                            id='search-checkin'
                            disabled
                        />
                    </div>
                    <div className='search-field'>{/*comop de fechas check out */}
                        <label htmlFor="search-checkout">Fecha de salida</label>
                        <input
                            type="text"
                            id='search-checkout'
                            disabled
                        />
                    </div>
                    <button className="btn btn-primary search-btn" disabled>🔍 Buscar</button>
                </div>
                <p className='search-bar-note'><small>La funcionalidad de busqueda estara disponible proximamente</small></p>
            </div>
        </div>
    );
};export default SearchBar;