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
                const response = await api.get('/associado'); // Assuming endpoint is /associados
                setAssociados(response.data.data);
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
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {associados.map(associado => (
                        <tr key={associado.pessoa_id}>
                            <td>{associado.pessoa_id}</td>
                            <td>{associado.pessoa_name}</td>
                            <td>{associado.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssociadosPage;
