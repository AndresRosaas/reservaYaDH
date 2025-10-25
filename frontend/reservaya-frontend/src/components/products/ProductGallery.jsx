import './ProductGallery.css';
import { useState, useEffect } from 'react';

//En este componente muestro una galeria de imagenes del producto
const ProductGallery = ({ images }) => {
    //Mellega un arrar con urls de imagenes

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (!showModal) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleCloseModal();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showModal]);

    if (!images || images.length === 0) {
        return (
            <div className="product-gallery">
                <p>No hay imágenes disponibles.</p>
            </div>
        );
    }
    const handleOpenModal = (index = 0) => {
        setSelectedImage(index);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleNext = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    }
    const handlePrev = () => {
        setSelectedImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
    const thumbnails = images.slice(1, 5);
    const hasMoreImages = images.length > 5;

    return (
        <>
            <div className="product-gallery">
                {/*imagen principal grande*/}
                <div className='gallery-main' onClick={() => handleOpenModal(0)}>
                    <img
                        src={images[0]}
                        alt='Imagen Principal' />

                </div>

                {images.length > 1 && (
                    <div className='gallery-thumbnails'>
                        {images.slice(1, 5).map((image, index) => (
                            <div
                                key={index} className='gallery-thumbnail' onClick={() => handleOpenModal(index + 1)}>
                                <img
                                    src={image}
                                    alt={`Miniatura ${index + 2}`} />
                            </div>
                        ))}
                        {images.length > 5 && (
                            <button
                                className='gallery-see-more'
                                onClick={() => handleOpenModal(0)}
                            >
                                + más
                            </button>
                        )}
                    </div>
                )}
            </div>
            {showModal && (
                <div className='gallery-modal' onClick={handleCloseModal}>
                    <div className='gallery-modal-content' onClick={(e) => {
                        e.stopPropagation();

                    }}>
                        <button className='gallery-modal-close' onClick={handleCloseModal}>X</button>

                        <img src={images[selectedImage]} alt={`Imagen ${selectedImage + 1}`} className='gallery-modal-image' />
                        <div className="gallery-modal-controls">
                            <button onClick={handlePrev}>← Anterior</button>
                            <span>{selectedImage + 1} / {images.length}</span>
                            <button onClick={handleNext}>Siguiente →</button>
                        </div>

                        <div className="gallery-modal-thumbnails">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Miniatura ${index + 1}`}
                                    className={selectedImage === index ? 'active' : ''}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    </div>


                </div>
            )}
        </>
    );
};
export default ProductGallery;
