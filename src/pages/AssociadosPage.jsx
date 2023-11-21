// src/pages/AssociadosPage.js

import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import api from '../api';
import Sidebar from '../components/Sidebar'
import PessoaModal from '../components/pessoaModal';
import './AssociadosPage.css';
import DataTable from '../components/DataTable';
import { CDBCollapse, CDBBtn } from 'cdbreact';

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
    const [profissao, setProfissao] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({})
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters)
        console.log(showFilters);
    };

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

        const fetchProfissao = async () => {
            try {
                const response = await api.get('/profissao'); // Replace with your actual endpoint
                const transformedProfissao = response.data.map(item => ({
                    id: item.profissao_id,
                    label: item.descricao,
                }));
                setProfissao(transformedProfissao);
            } catch (err) {
                setError('An error occurred while fetching the profissao.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfissao();
    }, []);


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
                <h2>Pessoas</h2>
                <h3>Filtro de pesquisa</h3>
                <form className="row g-4 needs-validation" onSubmit={handleSubmit}>
                    <div className="col-md-3">
                        <label htmlFor="pessoa_name" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pessoa_name"
                            name="pessoa_name"
                            placeholder="Nome"
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
                            id="profissao_id"
                            name="profissao_id"
                            value={filters.profissao_id}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione...</option>
                            {profissao.map(p => (
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
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
                            placeholder="CPF"
                            maskChar="_"
                            alwaysShowMask={false}
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            value={filters.cpf}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="rg" className="form-label">RG</label>
                        <InputMask
                            type="text"
                            className="form-control"
                            mask="9999999999"
                            placeholder="RG"
                            maskChar="_"
                            id="rg"
                            name="rg"
                            value={filters.rg}
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-primary">Buscar</button>

                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal">
                            Criar novo
                        </button>
                    </div>

                </form>


                <DataTable data={associados} />

                <PessoaModal />


            </div>
        </div>

    );
};

export default AssociadosPage;
