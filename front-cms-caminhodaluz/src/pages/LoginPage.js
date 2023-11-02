import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import logo from '../assets/logo.png'
import './LoginPage.css'

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await api.post('users/authenticate', { email, senha });
            if (response.data.token) {
                if (rememberMe) {
                    localStorage.setItem('authToken', response.data.token);
                } else {
                    sessionStorage.setItem('authToken', response.data.token);
                }
                navigate('/associados'); // Redireciona o usuário
            }
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError('Invalid credentials or error connecting to server');
        }
    };
    return (
        <div className="login-wrapper">
            <div className="image-section">
                
            </div>
            <div className="form-section">
                <form onSubmit={handleSubmit}>
                    <img src={logo} alt='Logo da Casa'></img>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            value={email}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Insira seu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Senha</label>
                        <input
                            value={senha}
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Insira sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-check custom-checkbox">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="flexCheckDefault"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Lembrar-me
                            </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            Entrar
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Esqueceu a <a href="#AS">senha?</a>
                    </p>
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
};

export default LoginPage;
