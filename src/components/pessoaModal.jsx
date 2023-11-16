import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import "./pessoaModal.css"
import api from '../api';
import ProfileImage from "./ProfileImage"


const PessoaModal = (edit = false) => {
    const [formData, setFormData] = useState({
        pessoa_name: '',
        sexo: 'M',
        cpf: null,
        rg: null,
        telefone1: null,
        telefone2: null,
        celular: null,
        email: null,
        profissao_id: 0,
        escolaridade_id: 0,
        formado_em: null,
        cep: null,
        bairro: null,
        endereco: null,
        numero: null,
        complemento: null,
        data_nascimento: '1999-01-01',
        data_cadastro: '1999-01-01',
        socio: 1,
        extensao: 'JPG',
        trabalha_na_casa: 1,
        profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TDZwTmg0hQAFESffy_Kl6N1Kx2MaeTId2ISCFo8MPg9ZfXsbSyCTt-EldWSEO6b0k6I&usqp=CAU'
    });
    const [webcamRef, setWebcamRef] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [webcamVisible, setWebcamVisible] = useState(false);
    const [escolaridades, setEscolaridades] = useState([]);
    const [profissao, setProfissao] = useState([]);


    const handleImageChange = (newImageSrc) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            profile_image: newImageSrc
        }));
    };



    useEffect(() => {

        const fetchEscolaridades = async () => {
            try {
                const response = await api.get('/escolaridade'); // Replace with your actual endpoint
                const transformedEscolaridades = response.data.map(item => ({
                    id: item.idescolaridade,
                    label: item.escolaridade_name,
                }));
                setEscolaridades(transformedEscolaridades);
            } catch (err) {
            } finally {
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
            } finally {

            }
        };

        fetchProfissao();
    }, []);

    const handleCaptureImage = () => {
        const imageSrc = webcamRef.getScreenshot();
        console.log("Captured image:", imageSrc);

        // Update the formData state to include the captured image
        setFormData(prevFormData => ({
            ...prevFormData,
            profile_image: imageSrc
        }));

        setWebcamVisible(false); // Hide the webcam after capturing the image
    };


    const handleChange = (e) => {

        // Handle other form changes normally
        const { name, value } = e.target;
        setFormData(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));

    };
    const prepareFormDataForSubmission = (data) => {
        return {
            ...data,
            pessoa_id: parseInt(data.pessoa_id, 10) || 0, // Convert to integer, default to 0 if NaN
            profissao_id: parseInt(data.profissao_id, 10) || 0,
            escolaridade_id: parseInt(data.escolaridade_id, 10) || 0,
            socio: parseInt(data.socio, 10) || 0,
            trabalha_na_casa: parseInt(data.trabalha_na_casa, 10) || 0,
            // Add any other fields that need to be converted
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = prepareFormDataForSubmission(formData);

        try {
            // Replace '/your_endpoint' with the actual endpoint for submitting the form data
            const response = await api.post('/associado', payload);
            console.log(response.data);
            // Additional handling (e.g., showing a success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Error handling (e.g., showing an error message)
        }
    };


    return (
        <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="userModalLabel">Formulário Pessoa</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='row g-3 needs-validation' onSubmit={handleSubmit}>
                            <div className="col-md-2">
                                <ProfileImage initialSrc={formData.profile_image} onImageChange={handleImageChange}></ProfileImage>
                            </div>
                            <div className="col-md-10">
                                <label className="form-label">Tirar foto</label>
                                {webcamVisible ? (
                                    <div className="webcam">
                                        <Webcam
                                            audio={false}
                                            ref={(webcam) => setWebcamRef(webcam)}
                                            screenshotFormat="image/jpeg"
                                            screenshotQuality={0.5}
                                        />
                                        <div class="d-grid gap-2 d-md-block">
                                            <button className="btn btn-primary" onClick={handleCaptureImage}>
                                                Capturar
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => setWebcamVisible(false)}>
                                                Fechar
                                            </button>
                                        </div>

                                    </div>
                                ) : (

                                    <button className="btn btn-primary" onClick={() => setWebcamVisible(true)}>
                                        Abrir webcam
                                    </button>
                                )}
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="pessoa_name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="pessoa_name" name="pessoa_name" onChange={handleChange} value={formData.pessoa_name} placeholder='Nome Completo' required />
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="data_nascimento" className="form-label" aria-required={true}>Data de Nascimento</label>
                                <input type="date" className="form-control" id="data_nascimento" name="data_nascimento" onChange={handleChange} value={formData.data_nascimento} required />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cpf" className="form-label">CPF</label>
                                <input type="text" className="form-control" id="cpf" name="cpf" onChange={handleChange} value={formData.cpf} placeholder='123.345.678-90' />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="rg" className="form-label">RG</label>
                                <input type="text" className="form-control" id="rg" name="rg" onChange={handleChange} value={formData.rg} placeholder='1234567890' />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="escolaridade" className="form-label">Escolaridade</label>
                                <select
                                    className="form-select"
                                    id="escolaridade_id"
                                    name="escolaridade_id"
                                    value={formData.escolaridade_id}
                                    onChange={handleChange}
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
                                    value={formData.profissao_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione...</option>
                                    {profissao.map(p => (
                                        <option key={p.id} value={p.id}>{p.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="formado_em" className="form-label">Formação</label>
                                <input type="text" className="form-control" id="formado_em" name="formado_em" onChange={handleChange} value={formData.formado_em} />
                            </div>

                            <div className="col-md-7">
                                <label className="form-label">Gênero</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="radio"
                                        id="sexo-homem"
                                        name="sexo"
                                        value="M"
                                        checked={formData.sexo === 'M'}
                                        onChange={handleChange}
                                        style={{ margin: '15px' }}
                                    />
                                    <label htmlFor="sexo-homem">Homem</label>

                                    <input
                                        type="radio"
                                        id="sexo-mulher"
                                        name="sexo"
                                        value="F"
                                        checked={formData.sexo === 'F'}
                                        onChange={handleChange}
                                        style={{ margin: '15px' }}
                                    />
                                    <label htmlFor="sexo-mulher">Mulher</label>

                                    <input
                                        type="radio"
                                        id="sexo-nao-binario"
                                        name="sexo"
                                        value="NB"
                                        checked={formData.sexo === 'NB'}
                                        onChange={handleChange}
                                        style={{ margin: '15px' }}
                                    />
                                    <label htmlFor="sexo-nao-binario">Pessoa não binária</label>

                                    <input
                                        type="radio"
                                        id="sexo-nao-informado"
                                        name="sexo"
                                        value=""
                                        checked={formData.sexo === ''}
                                        onChange={handleChange}
                                        style={{ margin: '15px' }}
                                    />
                                    <label htmlFor="sexo-nao-informado">Prefiro não responder</label>
                                </div>
                            </div>
                            <hr></hr>
                            <h5>Relacão com a sociedade</h5>
                            <div className="col-md-2">
                                <label htmlFor="data_cadastro" className="form-label" aria-required={true}>Data de Início</label>
                                <input type="date" className="form-control" id="data_cadastro" name="data_cadastro" onChange={handleChange} value={formData.data_cadastro} required/>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Sócio</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="radio"
                                        id="socio-sim"
                                        name="socio"
                                        value="1"
                                        checked={formData.socio === 1}
                                        onChange={handleChange}
                                        style={{ margin: '15px' }}
                                    />
                                    <label htmlFor="socio-sim">Sim</label>

                                    <input
                                        type="radio"
                                        id="sexo-mulher"
                                        name="socio"
                                        value="0"
                                        checked={formData.socio === 0}
                                        onChange={handleChange}
                                        style={{ margin: '15px' }}
                                    />
                                    <label htmlFor="sexo-mulher">Não</label>

                                </div>
                            </div>

                            <hr></hr>
                            <h5>Informações para contato</h5>
                            <div className="col-md-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} placeholder='nome.sobrenome@email.com' />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="celular" className="form-label">Celular</label>
                                <input type="text" className="form-control" id="celular" name="celular" onChange={handleChange} value={formData.celular} placeholder='(51) 99999-9999' />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="telefone1" className="form-label">Telefone</label>
                                <input type="text" className="form-control" id="telefone1" name="telefone1" onChange={handleChange} value={formData.celular} placeholder='(51) 9999-9999' />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="endereco" className="form-label">Endereço</label>
                                <input type="text" className="form-control" id="endereco" name="endereco" onChange={handleChange} value={formData.endereco} />
                            </div>
                            <div className="col-sm">
                                <label htmlFor="numero" className="form-label">Número</label>
                                <input type="text" className="form-control" id="numero" name="numero" onChange={handleChange} value={formData.numero} />
                            </div>
                            <div className="col-sm">
                                <label htmlFor="complemento" className="form-label">Complemento</label>
                                <input type="text" className="form-control" id="complemento" name="complemento" onChange={handleChange} value={formData.complemento} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="cep" className="form-label">CEP</label>
                                <input type="text" className="form-control" id="cep" name="cep" onChange={handleChange} value={formData.cep} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="bairro" className="form-label">Bairro</label>
                                <input type="text" className="form-control" id="bairro" name="bairro" onChange={handleChange} value={formData.bairro} />
                            </div>
                            <hr />


                            <div class="d-grid gap-2 d-md-flex justify-content-md-end last-content">


                                <button type="submit" className="btn btn-success">Salvar</button>
                                <button type="button" className="btn btn-danger">Sair</button>

                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PessoaModal;
