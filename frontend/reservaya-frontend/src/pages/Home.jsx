import './Home.css';
import ProductList from '../components/products/ProductList';
import MainLayout from '../components/layout/MainLayout';
import SearchBar from '../components/search/SearchBar';
import { useState, useEffect } from 'react';
import api from '../services/api';

//Pagina principal con el listado de productos
const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    //me traigo las categorias que hay al iniciar la pagina
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error al cargar las categorias:', error);
            }
        };
        loadCategories();
    }, []);

    return (

        <div className="main-layout">
            <MainLayout>
                <SearchBar />
                {/*Filtro por categorias */}
                {categories.length > 0 && (
                    <div className='category-filters'>
                        <h3>Filtrar por categoria</h3>
                        <div className='filter-buttons'>
                            <button 
                            className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
                            onClick={()=> setSelectedCategory(null)}
                            >
                                Todos
                            </button>
                            {categories.map(cat=>(
                                <button
                                key={cat.id}
                                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={()=> setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {/*Listado de productos*/}
                <ProductList selectedCategory={selectedCategory}/>

            </MainLayout >
        </div>
    );
};
export default Home;