// src/pages/Verificar/Verificar.jsx
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import styles from './Verificar.module.css';

function Verificar() {
    const [pixKey, setPixKey] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Campos adicionais que não serão enviados para a API de verificação ---
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');
    // -----------------------------------------------------------------------

    const handleVerifyPix = async (e) => {
        e.preventDefault();

        if (!pixKey) {
            setError('Por favor, digite a chave Pix para verificar.');
            setResult(null);
            return;
        }

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch(`http://localhost:4000/verificarPix/${pixKey}`);
            const data = await response.json();

            if (response.ok) {
                setResult(data);
            } else {
                setError(data.message || 'Ocorreu um erro na verificação.');
            }
        } catch (err) {
            console.error('Erro ao conectar com o backend:', err);
            setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    // Função auxiliar para determinar a classe do status
    const getStatusClass = (status) => {
        if (status === 'Nao Confiável') {
            return styles.statusUnreliable;
        } else if (status === 'Confiável') {
            return styles.statusReliable;
        }
        return ''; // Retorna vazio se não for nenhum dos dois
    };

    return (
        <>
            <Header />
            <Container>
                <div className={styles.formContainer}>
                    <h2>Verificar se o Pix é Confiável</h2>
                    <img className={styles.imgLogo} src="/Logofinal.png" alt="Imagem da logo" />
                    <form onSubmit={handleVerifyPix}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="sobrenome">Sobrenome</label>
                            <input
                                type="text"
                                id="sobrenome"
                                name="sobrenome"
                                placeholder="Digite seu sobrenome"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="nascimento">Data de Nascimento</label>
                            <input
                                type="date"
                                id="nascimento"
                                name="nascimento"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Gênero</label>
                            <div className={styles.genderOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="masculino"
                                        checked={genero === 'masculino'}
                                        onChange={(e) => setGenero(e.target.value)}
                                    />
                                    Masculino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="feminino"
                                        checked={genero === 'feminino'}
                                        onChange={(e) => setGenero(e.target.value)}
                                    />
                                    Feminino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="outro"
                                        checked={genero === 'outro'}
                                        onChange={(e) => setGenero(e.target.value)}
                                    />
                                    Outro
                                </label>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="pix">Verificar Pix</label>
                            <input
                                type="text"
                                id="pix"
                                name="pix"
                                placeholder="Digite a chave Pix"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.btnVerificar} disabled={loading}>
                            {loading ? 'Verificando...' : 'Verificar'}
                        </button>
                    </form>

                    {loading && <p className={styles.loadingMessage}>Carregando resultados...</p>}
                    {error && <p className={styles.errorMessage}>Erro: {error}</p>}

                    {result && (
                        <div className={styles.verificationResult}>
                            {/* APLICANDO CLASSE DINÂMICA AQUI */}
                            <h3 className={getStatusClass(result.status)}>
                                Status da Chave Pix: {result.status}
                            </h3>

                            {result.status === 'Nao Confiável' ? (
                                <div className={styles.unreliableDetails}>
                                    <p className={styles.unreliableMessage}>
                                        **Atenção:** Esta chave Pix possui denúncias em nosso sistema e não é considerada confiável.
                                    </p>
                                    <p><strong>Total de Denúncias:</strong> {result.denuncias}</p>
                                    <p><strong>Último Motivo de Denúncia:</strong> {result.motivoUltimaDenuncia}</p>
                                    {result.comentarioUltimaDenuncia && (
                                        <p><strong>Comentário da Última Denúncia:</strong> {result.comentarioUltimaDenuncia}</p>
                                    )}
                                    <p><strong>Data da Última Denúncia:</strong> {new Date(result.ultimaDenuncia).toLocaleDateString()} às {new Date(result.ultimaDenuncia).toLocaleTimeString()}</p>
                                    {result.nome && <p><strong>Nome Registrado na Denúncia:</strong> {result.nome} {result.sobrenome}</p>}
                                    {result.dataNascimento && <p><strong>Data de Nascimento (Registrado na Denúncia):</strong> {new Date(result.dataNascimento).toLocaleDateString()}</p>}
                                    {result.genero && <p><strong>Gênero (Registrado na Denúncia):</strong> {result.genero}</p>}
                                </div>
                            ) : (
                                <p className={styles.reliableMessage}>
                                    Esta chave Pix não possui denúncias em nosso sistema e é considerada confiável, com base nas informações disponíveis.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Verificar;