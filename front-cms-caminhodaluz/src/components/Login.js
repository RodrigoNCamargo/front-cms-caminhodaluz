import React, { useState } from 'react';
import '../components/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(email, password);
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control login-input"
                    id="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                    type="password"
                    className="form-control login-input"
                    id="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary login-button" onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;
