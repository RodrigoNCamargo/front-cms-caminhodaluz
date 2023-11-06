// src/pages/AssociadosPage.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import Sidebar from '../components/Sidebar'
import './AssociadosPage.css';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import DataTable from '../components/DataTable';


const AssociadosPage = () => {
    const [associados, setAssociados] = useState({
        columns: [
            {
                label: "Nome",
                field: "pessoa_name",
                width: 200,
                sort: "asc"
            },
            {
                label: "Data de Cadastro",
                field: "data_cadastro",
                width: 100
            },
            {
                label: "Data de Nascimento",
                field: "data_nascimento",
                width: 150
            },
            {
                label: "Celular",
                field: "celular",
                width: 150
            },
            {
                label: "ID",
                field: "pessoa_id",
                width: 100
            }

        ], rows: []
    });
    const [escolaridades, setEscolaridades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        inscricao: '',
        pessoa: '',
        socio: '',
        escolaridade: '',
        profissao: '',
        sexo: '',
    })
    function testClickEvent(param) {
        alert('Row Click Event');
    }

    useEffect(() => {
        const fetchAssociados = async () => {
            try {
                const response = await api.get('/associado'); // Assuming endpoint is /associados
                const rows = response.data.data.map(item => ({
                    ...item,
                    clickEvent: () => testClickEvent(item.id), // Assuming each item has an 'id' field
                }));
                setAssociados(prevData => ({ ...prevData, rows }));
                setLoading(false);
            } catch (err) {
                setError('An error occurred while fetching the data.');
                setLoading(false);
            }
        };
        fetchAssociados();

        const fetchEscolaridades = async () => {
            try {
                const response = await api.get('/escolaridade'); // Replace with your actual endpoint
                const transformedEscolaridades = response.data.map(item => ({
                    id: item.idescolaridade,
                    label: item.escolaridade_name,
                }));
                setEscolaridades(transformedEscolaridades);
            } catch (err) {
                setError('An error occurred while fetching the escolaridades.');
            } finally {
                setLoading(false);
            }
        };

        fetchEscolaridades();
    }, []);


    const profissoes = [
        { id: 1, label: 'Engenheiro' },
        { id: 2, label: 'Médico' },
        // ...
    ];



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.get('/associado/filterBy', { params: filters });
            const rows = response.data
            setAssociados(prevData => ({ ...prevData, rows }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className="associados">
            <Sidebar />


            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='contentContainer'>
                <h2>Associados</h2>
                <form className="row g-4 needs-validation" onSubmit={handleSubmit}>
                    <div className="col-md-3">
                        <label htmlFor="pessoa" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pessoa_name"
                            name="pessoa_name"
                            value={filters.pessoa_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="socio" className="form-label">Sócio</label>
                        <select
                            className="form-select"
                            id="socio"
                            name="socio"
                            value={filters.socio}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione..</option>
                            <option value="1">Associado</option>
                            <option value="2">Associado Isento</option>
                            <option value="0">Colaborador</option>
                            <option value="3">Frequentador</option>
                            <option value="4">Inativo</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="escolaridade" className="form-label">Escolaridade</label>
                        <select
                            className="form-select"
                            id="escolaridade_id"
                            name="escolaridade_id"
                            value={filters.escolaridade_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            {escolaridades.map(e => (
                                <option key={e.id} value={e.id}>{e.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="profissao" className="form-label">Profissão</label>
                        <select
                            className="form-select"
                            id="profissao"
                            name="profissao"
                            value={filters.profissao}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            {profissoes.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="trabalha_na_casa" className="form-label">Trabalhador</label>
                        <select
                            className="form-select"
                            id="trabalha_na_casa"
                            name="trabalha_na_casa"
                            value={filters.trabalha_na_casa}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione..</option>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="sexo" className="form-label">Sexo</label>
                        <select
                            className="form-select"
                            id="sexo"
                            name="sexo"
                            value={filters.sexo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            id="sexo"
                            name="sexo"
                            value={filters.sexo}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione um campo de pesquisa</option>
                            <option value="cpf">CPF</option>
                            <option value="rg">RG</option>
                            <option value="telefone1">Telefone 1</option>
                            <option value="telefone2">Telefone 2</option>
                            <option value="celular">Celular</option>
                            <option value="endereco">Endereço</option>
                            <option value="formado_em">Formação Acadêmica</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            id="pessoa_name"
                            name="pessoa_name"
                            value={filters.pessoa_name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </div>

                </form>




                <DataTable data={associados} />
            </div>
        </div>

    );
};

export default AssociadosPage;
