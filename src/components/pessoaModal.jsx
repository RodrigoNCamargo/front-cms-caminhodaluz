import React, { useState } from 'react';
import Webcam from "react-webcam";

const PessoaModal = () => {
    const [formData, setFormData] = useState({
        pessoa_id: '',
        pessoa_name: '',
        sexo: 'M',
        cpf: '',
        rg: '',
        telefone1: '',
        telefone2: '',
        celular: '',
        email: '',
        profissao_id: '',
        escolaridade_id: '',
        formado_em: '',
        cep: '',
        bairro: '',
        endereco: '',
        numero: '',
        complemento: '',
        data_nascimento: '',
        data_cadastro: '',
        socio: 1,
        extensao: 'JPG',
        trabalha_na_casa: 1,
    });
    const [webcamRef, setWebcamRef] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [webcamVisible, setWebcamVisible] = useState(false);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // You can process the uploaded file as needed
        console.log("Uploaded file:", file);
        setCapturedImage(null); // Reset captured image
    };


    const handleCaptureImage = () => {
        const imageSrc = webcamRef.getScreenshot();
        // You can process the captured image as needed
        console.log("Captured image:", imageSrc);
        setCapturedImage(imageSrc);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a payload with the form data
        const payload = { ...formData };
        // You can do something with the payload here, like sending it to a server.
        console.log(payload);
    };
    return (
        <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="userModalLabel">Nova Pessoa</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='row g-3 needs-validation' onSubmit={handleSubmit}>
                            <div className="col-md-4">
                                <label htmlFor="pessoa_name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="pessoa_name" name="pessoa_name" onChange={handleChange} value={formData.pessoa_name} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="sexo" className="form-label">Sexo</label>
                                <select className="form-select" id="sexo" name="sexo" onChange={handleChange} value={formData.sexo}>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="data_nascimento" className="form-label" aria-required={true}>Data de Nascimento</label>
                                <input type="date" className="form-control" id="data_nascimento" name="data_nascimento" onChange={handleChange} value={formData.data_nascimento} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="cpf" className="form-label">CPF</label>
                                <input type="text" className="form-control" id="cpf" name="cpf" onChange={handleChange} value={formData.cpf} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="rg" className="form-label">RG</label>
                                <input type="text" className="form-control" id="rg" name="rg" onChange={handleChange} value={formData.rg} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="celular" className="form-label">Celular</label>
                                <input type="text" className="form-control" id="celular" name="celular" onChange={handleChange} value={formData.celular} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="profissao_id" className="form-label">Profissao</label>
                                <input type="number" className="form-control" id="profissao_id" name="profissao_id" onChange={handleChange} value={formData.profissao_id} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="escolaridade_id" className="form-label">Escolaridade</label>
                                <input type="number" className="form-control" id="escolaridade_id" name="escolaridade_id" onChange={handleChange} value={formData.escolaridade_id} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="formado_em" className="form-label">Formado Em</label>
                                <input type="text" className="form-control" id="formado_em" name="formado_em" onChange={handleChange} value={formData.formado_em} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="socio" className="form-label">Sócio</label>
                                <select className="form-select" id="socio" name="socio" onChange={handleChange} value={formData.socio}>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-8">
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
                            <div className="col-md-4">
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="image" className="form-label">Upload da imagem de perfil</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Tirar foto de perfil</label>
                                {webcamVisible ? (
                                    <div className="d-flex">
                                        <Webcam
                                            audio={false}
                                            ref={(webcam) => setWebcamRef(webcam)}
                                            screenshotFormat="image/jpeg"
                                        />
                                        <button className="btn btn-primary" onClick={handleCaptureImage}>
                                            Capture Image
                                        </button>
                                    </div>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => setWebcamVisible(true)}>
                                        Abrir webcam
                                    </button>
                                )}
                            </div>

                            {capturedImage && (
                                <div className="col-md-12">
                                    <label className="form-label">Pré-visualização</label>
                                    <img src={capturedImage} alt="Captured" className="img-fluid" />
                                </div>
                            )}

                        </form>
                    </div>
                    <div className="modal-footer">


                        <button type="submit" className="btn btn-primary">Salvar</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PessoaModal;
