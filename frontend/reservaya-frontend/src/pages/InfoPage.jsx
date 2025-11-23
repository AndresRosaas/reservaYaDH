import { useParams, useNavigate } from 'react-router-dom';
import './InfoPage.css';

function InfoPage() {
    const { section } = useParams();
    const navigate = useNavigate();

    const content = {
        terms: {
            title: 'Términos y Condiciones',
            text: 'Los términos y condiciones de ReservaYa se encuentran en desarrollo. Próximamente estará disponible toda la información legal sobre el uso de nuestra plataforma.'
        },
        privacy: {
            title: 'Política de Privacidad',
            text: 'Tu privacidad es importante para nosotros. En ReservaYa protegemos tus datos personales y no los compartimos con terceros sin tu consentimiento.'
        },
        contact: {
            title: 'Contacto',
            text: 'Podés contactarnos a través de nuestro WhatsApp o enviando un correo a contacto@reservaya.com'
        }
    };

    const info = content[section] || content.terms;

    return (
        <div className="info-page">
            <div className="info-container">
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
                <h1>{info.title}</h1>
                <p>{info.text}</p>
            </div>
        </div>
    );
}

export default InfoPage;