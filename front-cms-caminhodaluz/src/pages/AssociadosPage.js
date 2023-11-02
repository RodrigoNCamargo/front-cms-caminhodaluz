// src/pages/AssociadosPage.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import Sidebar from '../components/Sidebar'
import './AssociadosPage.css';
const AssociadosPage = () => {
    const [associados, setAssociados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssociados = async () => {
            try {
                const response = await api.get('/users'); // Assuming endpoint is /associados
                setAssociados(response.data);
                setLoading(false);
            } catch (err) {
                setError('An error occurred while fetching the data.');
                setLoading(false);
            }
        };

        fetchAssociados();
    }, []);

    return (
        <div className="associados">
               <Sidebar />
            <h2>Associados</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {associados.map(associado => (
                    <li key={associado.id}>
                        {associado.nome} ({associado.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssociadosPage;
