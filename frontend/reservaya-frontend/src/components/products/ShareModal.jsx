import { useState } from "react";
import './ShareModal.css';
import { toast } from "react-toastify";


function ShareModal({product, onClose}) {
    const [customMessage, setCustomMessage] = useState('');

    //URL completa del producto
    const productUrl = `${window.location.origin}/products/${product.id}`;

    //Mensaje por defecto
    const defaultMessage = `Mira este producto! ${product.name}`;

    //compartir en Facebook
    const shareToFacebook = () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        window.open(fbUrl, '_blank', 'width=600,height=400');
    };

    const shareToX = () => {
        const text = customMessage || defaultMessage;
        const xUrl = `https://www.x.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`;
        window.open(xUrl, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const text = customMessage || defaultMessage;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + productUrl)}`;
        window.open(whatsappUrl,  '_blank');
    };

    const copyLink  = () => {
        navigator.clipboard.writeText(productUrl)
        .then(() => toast.info('Enlace copiado.'))
        .catch(()=> toast.error('Error al copiar el enlace'));
    };

    return(
        <div className="share-modal-overlay" onClick={onClose}>
            <div className="share-modal" onClick={(e) => e.stopPropagation()}>
                <div className="share-modal-header">
                    <h2>Compartir producto</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>

                <div className="share-product-info">
                    <img src={product.imageUrls?.[0]} alt={product.name} className="share-product-image" />
                    <div className="share-product-details">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span className="share-product-url">{productUrl}</span>
                    </div>
                </div>
                <div className="share-custom-message">
                    <label> Mensaje personalizado (opcional): </label>
                    <textarea
                    placeholder={defaultMessage}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                    />
                </div>
                <div className="share-buttons">
                    <button
                    className="share-btn facebook"
                    onClick={shareToFacebook}
                    >
                        <span>📘</span> Facebook
                    </button>
                    <button
                    className="share-btn x"
                    onClick={shareToX}
                    >
                        <span>🐦</span> X
                    </button>
                    <button
                    className="share-btn whatsapp"
                    onClick={shareToWhatsApp}
                    >
                        <span>💬</span> WhatsApp
                    </button>
                    <button
                    className="share-btn instagram"
                    onClick={copyLink}
                    >
                        📷 Instagram <span>🔗</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ShareModal;