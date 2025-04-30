import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import styles from './Verificar.module.css';

function Verificar() {
    return (
        <>
            <Header />
            <Container>
                <div className={styles.formContainer}>

                    <h2>Verificar se o Pix e Confiável</h2>
                    <img className={styles.imgLogo} src="/Logofinal.png" alt="Imagem da logo" />
                    <form>
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
                                placeholder="Digite seu sobrenome" />
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
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="masculino"
                                    />
                                    Masculino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="feminino"
                                    />
                                    Feminino
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="outro"
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
                            />
                        </div>

                        <button type="submit" className={styles.btnVerificar}>
                            Verificar
                        </button>
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Verificar;