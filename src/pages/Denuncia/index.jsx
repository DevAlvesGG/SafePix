import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import styles from './Denuncia.module.css'
import { useNavigate } from 'react-router-dom'


function Denuncia() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Sua denúncia foi realizada com Sucesso! Volte para página Home ou realize outra denúncia. Obrigado !')
    }

    return (
        <>
            <Header />
            <Container>
                <div className={styles.formContainer}>
                    <h2>Denúnciar uma chave Pix</h2>
                    <img className={styles.imgLogo} src="/Logofinal.png" alt="Imagem da logo" />

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="sobrenome">Sobrenome</label>
                            <input
                                type="text"
                                id="sobrenome"
                                name="sobrenome"
                                placeholder="Digite seu sobrenome"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="nascimento">Data de Nascimento</label>
                            <input
                                type="date"
                                id="nascimento"
                                name="nascimento"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Gênero</label>
                            <div className={styles.genderOptions}>
                                <label><input type="radio" name="genero" value="masculino" /> Masculino</label>
                                <label><input type="radio" name="genero" value="feminino" /> Feminino</label>
                                <label><input type="radio" name="genero" value="outro" /> Outro</label>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="pix">Denúnciar Pix</label>
                            <input
                                type="text"
                                id="pix"
                                name="pix"
                                placeholder="Digite a chave Pix"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="motivo">Motivo da Denúncia</label>
                            <select id="motivo" name="motivo">
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
                                rows="4" placeholder="Descreva o ocorrido..."></textarea>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.btnDenuncia}>Denúnciar</button>
                            <button type="button" onClick={() => navigate('/')} className={styles.btnVoltar}>Voltar para Home</button>

                        </div>
                    </form>
                </div>
            </Container>
            <Footer />

        </>
    )
}
export default Denuncia