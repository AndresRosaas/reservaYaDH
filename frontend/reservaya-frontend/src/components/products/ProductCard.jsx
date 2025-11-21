import './ProductCard.css';
import FavoriteButton from './FavoriteButton';

//Componente para mostrar un producto individual
const ProductCard = ({ product, onClick }) => {
//Si el producto tiene una imagen, uso la primera imagen, si no, uso un placeholder
    const imageUrl = product.imageUrls?.[0];

    return (
        //Cuando se hace click en la tarjeta, se llama a la función onClick con el producto como argumento
        <div className="product-card" onClick={() => onClick(product.id)}>
            <div className='favorite-button-container'>
                <FavoriteButton productId={product.id} />
            </div>
            {/* Imagen del producto */}
            <div className='product-card-image'>
                <img src={imageUrl} alt={product.name}/>
            </div>
            {/*Contenido: titulo, descripcion y boton*/}
            <div className="product-card-content">
                <h3 className='produc-card-name'>{product.name}</h3>
                <p className='product-card-description'>{product.description}</p>
                <button className="product-card-primary">Ver Detalles</button>
            </div>
        </div>
    );

};
export default ProductCard;