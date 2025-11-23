import './WhatsAppButton.css'

const WhatsAppButton = ({phone = "5492227543424", message = "Hola! Tengo una consulta"}) =>{
    const handleClick = () => {
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url,'_blank');
    };

    return(
        <button className='whatsapp-button' onClick={handleClick} aria-label='Contactar por WhatsApp'>
            <svg viewBox='0 0 32 32' className='whatsapp-icon'>
                <path fill='currentColor' d="M16 0C7.163 0 0 7.163 0 16c0 2.837.736 5.502 2.022 7.812L0 32l8.413-2.012A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.082 22.903c-.347.967-1.715 1.778-2.775 2.01-.726.16-1.671.285-4.86-.995-4.08-1.64-6.71-5.79-6.913-6.058-.195-.268-1.633-2.18-1.633-4.158 0-1.978 1.033-2.953 1.4-3.357.347-.38.92-.536 1.467-.536.177 0 .336.01.48.017.4.017.6.04.863.663.33.78 1.133 2.763 1.233 2.963.1.2.167.433.033.7-.133.267-.2.433-.4.667-.2.233-.42.52-.6.7-.2.2-.408.417-.175.817.233.4 1.033 1.703 2.22 2.758 1.527 1.357 2.813 1.778 3.213 1.978.4.2.633.167.867-.1.233-.267 1-1.167 1.267-1.567.267-.4.533-.333.9-.2.367.133 2.333 1.1 2.733 1.3.4.2.667.3.767.467.1.167.1.967-.247 1.933z"/>
            </svg>
        </button>
    );
};
export default WhatsAppButton;