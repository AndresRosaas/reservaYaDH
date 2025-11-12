import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuth();

    //Que estado tiene el formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    //estado de errores
    const [errors, setErrors] = useState({});
    //estado de loading para la peticion
    const [isLoading, setIsLoading] = useState(false);
    //menaje de error general del servidor
    const [servError, setServError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    
    //limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
        setErrors({
            ...formData,
            [name]: ''
        })
        if (servError) {
            setServError('')
        }
    }};
    const validateForm = () => {
        const newErrors = {};

        //valido que el mail sea correcto
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es valido';
        }
        //validar password
        if (!formData.password) {
            newErrors.password = 'La constraseña es obligatoria';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    //manejar el submit del form
    const HandleSubmit = async (e) => {
        e.preventDefault();
        //valido con la funcion creada
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        setServError('');

        //intentar login
        const result = await login(formData.email, formData.password);
        setIsLoading(false);
        if (result.success) {
            //si el login es exitoso, redirigir al home
            navigate('/');
        } else {
            //Si no mostrar el error
            setServError(result.message);
        }
    };
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Iniciar Sesion</h1>
                    <p>Ingresa a tu cuenta para continuar</p>
                </div>
                {/*Mensaje de error del servidor */}
                {servError && (
                    <div className="alert alert-error">
                        {servError}
                    </div>
                )}
                <form onSubmit={HandleSubmit} className="login-form">
                    {/*campo para el mail */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                            placeholder="tu@email.com"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                    {/*Campor password */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                            placeholder="******"
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>
                    {/*boton submit */}
                    <button
                        type="submit"
                        className="btn-primary btn-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Ingresando...' : 'Iniciar sesion'}
                    </button>
                </form>
                {/*link al registro de usuairo */}
                <div className="login-footer">
                    <p>No tenes cuenta?{' '}
                        <Link to="/registro" className="link-primary">Crear cuenta</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
