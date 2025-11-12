import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth(); 

    //estado del formulario, errores, vacios
    const [formData, setFromData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData({
            ...formData,
            [name]: value
        });
        //limpio si hay un error en ese campo
        if (error[name]) {
            setError({
                ...error,
                [name]: ''
            });
        }
        if (serverError) {
            setServerError('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        //Valido el nombre
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'El nombre es obligatorio';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'El nombre debe tener al menos dos caracteres';
        } else if (formData.firstName.trim().length > 50) {
            newErrors.firstName = 'El nombre no puede superar los 50 caracteres';
        }
        //valido el apellido
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'El apellido es obligatorio';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'El apellido debe tener al menos dos caracteres';
        } else if (formData.lastName.trim().length > 50) {
            newErrors.lastName = 'El apellido no puede superar los 50 caracteres';
        }
        //valido email
        if (!formData.email.trim()) {
            newErrors.email = 'el email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El mail no es valido';
        }
        //Valido password, alfanumerica y al menos un caracter
        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria';
        } else if (formData.password.trim().length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        } else if (formData.password.trim().length > 16) {
            newErrors.password = 'La contraseña no puede superar los 16 caracteres';
        } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
            newErrors.password = 'La contraseña debe contener letras y números';
        } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
            newErrors.password = 'La contraseña debe incluir al menos un símbolo (por ejemplo: !@#$%^&*)';
        }
        if(!formData.confirmPassword){
            newErrors.confirmPassword = 'Debes confirmar la contraseña';
        }else if (formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    //Manejar el submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }
        setIsLoading(true);
        setServerError('');
        //tengo que preparar los datos para enviar sin el confirm password
        const userData = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };
        const result = await register(userData);
        setIsLoading(false);

        if(result.success){
            navigate('/');//si todo esta bien vuelve al home
        }else{
            setServerError(result.message); //si no sale bien devuelve el error
        }
    };
    return(
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h1>Crear cuenta</h1>
                    <p>Registrate para poder acceder a todas las funcionalidades</p>
                </div>
                {/**Mensaje de error del servidor */}
                {serverError && (
                    <div className="alert alert-error">
                        {serverError}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre</label>
                        <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={error.firstName ? 'input-error' : ''}
                        placeholder="Juan"
                        autoComplete="given-name"
                        />
                        {error.firstName &&(
                            <span className="error-message">{error.firstName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={error.lastName ? 'input-error' : ''}
                        placeholder="Perez"
                        autoComplete="family-name"
                        />
                        {error.lastName &&(
                            <span className="error-message">{error.lastName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={error.email ? 'input-error' : ''}
                        placeholder="tu@email.com"
                        autoComplete="given-email"
                        />
                        {error.email &&(
                            <span className="error-message">{error.email}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={error.password ? 'input-error' : ''}
                        placeholder="*******"
                        autoComplete="new-password"
                        />
                        {error.password &&(
                            <span className="error-message">{error.password}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input 
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={error.confirmPassword ? 'input-error' : ''}
                        placeholder="*******"
                        autoComplete="new-password"
                        />
                        {error.confirmPassword &&(
                            <span className="error-message">{error.confirmPassword}</span>
                        )}
                    </div>

                    {/**Boton de SUBMIT */}
                    <button 
                    type="submit"
                    className="btn-primary btn-full"
                    disabled={isLoading}
                    >
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}</button>

                </form>
                {/**Link al login */}
                <div>
                    <p>
                        Ya tenes cuenta??{' '}
                        <Link to="/login" className="link-primary">Iniciar sesion</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;
  