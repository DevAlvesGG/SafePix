import React, { useState, useRef } from 'react'; // Importar useState e useRef
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import styles from './Denuncia.module.css';
import { useNavigate } from 'react-router-dom';

function Denuncia() {
    const navigate = useNavigate();
    const formRef = useRef(null); // Ref para o formulário

    // Estados para os campos do formulário
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');
    const [chavePix, setChavePix] = useState(''); // Estado para o campo 'Denunciar Pix'
    const [motivo, setMotivo] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = async (e) => { // Tornar a função assíncrona
        e.preventDefault();

        // Coletar todos os dados dos estados
        const denunciaData = {
            nome,
            sobrenome,
            dataNascimento,
            genero,
            chavePix, // O nome do campo no backend é 'chavePix'
            motivo,
            comentario
        };

        try {
            const response = await fetch('http://localhost:4000/denunciarPix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(denunciaData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sua denúncia foi realizada com Sucesso! Volte para página Home ou realize outra denúncia. Obrigado !');
                console.log('Resposta da API:', data);
                // Limpar o formulário após o sucesso
                if (formRef.current) {
                    formRef.current.reset(); // Reseta os campos do formulário
                }
                // Ou resetar os estados manualmente se preferir:
                // setNome(''); setSobrenome(''); setChavePix(''); etc.
            } else {
                alert(`Erro ao registrar denúncia: ${data.message || 'Erro desconhecido'}`);
                console.error('Erro na resposta da API:', data);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor. Verifique se o backend está rodando e se o CORS está habilitado.');
            console.error('Erro de rede ou servidor:', error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <div className={styles.formContainer}>
                    <h2>Denúnciar uma chave Pix</h2>
                    <img className={styles.imgLogo} src="/Logofinal.png" alt="Imagem da logo" />

                    <form onSubmit={handleSubmit} ref={formRef}> {/* Associar a ref ao formulário */}
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
                                    /> Masculino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="feminino"
                                        checked={genero === 'feminino'}
                                        onChange={(e) => setGenero(e.target.value)}
                                    /> Feminino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="outro"
                                        checked={genero === 'outro'}
                                        onChange={(e) => setGenero(e.target.value)}
                                    /> Outro
                                </label>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="pix">Denunciar Pix</label> {/* Corrigido o label para "Denunciar Pix" */}
                            <input
                                type="text"
                                id="pix" // ID do campo Pix
                                name="chavePix" // Nome do campo que corresponde ao backend
                                placeholder="Digite a chave Pix"
                                value={chavePix}
                                onChange={(e) => setChavePix(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="motivo">Motivo da Denúncia</label>
                            <select
                                id="motivo"
                                name="motivo"
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                <option value="fraude">Fraude</option>
                                <option value="golpe">Golpe</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="comentario">Comentário</label>
                            <textarea
                                id="comentario"
                                name="comentario"
                                rows="4"
                                placeholder="Descreva o ocorrido..."
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            ></textarea>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.btnDenuncia}>Denunciar</button>
                            <button type="button" onClick={() => navigate('/')} className={styles.btnVoltar}>Voltar para Home</button>
                        </div>
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Denuncia;