import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import './ProductList.css';
import api from "../../services/api";

//Listo los componentes que traigo desde el backend, y que este vacio al inicio
const ProductList = ({ selectedCategory }) => {
    //useState para manejar el estado de los productos
    const [products, setProducts] = useState([]);
    //useState para saber si estoy cargando los productos
    const [loading, setLoading] = useState(true);
    //UseState para manejar errores
    const [error, setError] = useState(null);

    //useEffect se ejecuta cuando carga por primera vez el componente
    useEffect(() => {
        fetchProducts();
    }, []);
    //Funcion que trae los productos desde el backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            //Hago la peticion al backend
            const response = await api.get('/products');
            //Tengo que mezclar los productos y tomar un maximo de 10 productos aleatorios
            const shuffled = [...response.data].sort(() => 0.5 - Math.random());
            //Guardo los primeros 10 productos
            setProducts(shuffled.slice(0, 10));
            setError(null);
        } catch (err) {
            //Si algo falla, guardo el error
            setError('Error al cargar los productos');
            console.error('Error:', err);
        } finally {
            //Termino de cargar
            setLoading(false);

        }
    };
    //Filtro los productos seleccionados
    const filteredProducts = selectedCategory
        ? products.filter(p => p.category?.id === selectedCategory)
        : products;

    //Ahora hago la funcion que se ejecuta cuando hago click en un producto
    const handleProductClick = (id) => {
        window.location.href = `/products/${id}`;
    };
    //Si estoy cargando, muestro un mensaje de carga
    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }//Si hay un error, muestro el mensaje y un boton para reintentar
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button className='btn btn-primary' onClick={fetchProducts}>Reintentar</button>
            </div>
        );
    }
    //si no hay productos, muestro un mensaje
    if (filteredProducts.length === 0) {
        return (
            <div className="loading">
                {selectedCategory
                    ? 'No hay productos en esta categoria'
                    : 'No hay productos disponibles'}
            </div>
        )
    }
    //Si todo esta bien, muestro la lista de productos
    return (
        <div className="product-list-container">
            <h2 className="product-list-title">
                {selectedCategory
                ? 'Productos Filtrados'
                : 'Productos Destacados'}</h2>
            {/*Grid de productos*/}
            {/* .map para recorrer el array de productos y renderizar un ProductCard por cada uno */}
           <div className="product-list">
                    {filteredProducts.length === 0 ? (
                        <p>No hay productos en esta categoria</p>
                    ): (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onClick={()=>handleProductClick(product.id)}/>
                        ))
                    )}
           </div>
        </div>
    );
};


export default ProductList;
