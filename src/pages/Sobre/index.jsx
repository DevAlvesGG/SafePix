import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import styles from './Sobre.module.css'
function Sobre() {
    return (
        <>
            <Header />
            <Container>
                <section className={styles.sobre}>
                    <div className={styles.box1}>
                        <span className={styles.nos}>SOBRE NÓS</span>
                        <h2 className={styles.texto1}>
                            Na SafePix, nossa missão é proteger pessoas contra golpes envolvendo o Pix. Somos uma plataforma independente que permite o registro e a consulta de denúncias públicas de fraudes.
                            Não estamos aqui para prejudicar bancos, empresas ou instituições financeiras. Pelo contrário: acreditamos que segurança é uma responsabilidade compartilhada entre todos os participantes do sistema financeiro.
                            A SafePix não substitui a atuação da polícia ou de órgãos judiciais. Não realizamos investigações e não emitimos julgamentos. Somos uma ferramenta de apoio à prevenção de fraudes, promovendo transparência e conscientização.

                        </h2>
                    </div>
                    <div className={styles.box2}>
                        <span className={styles.objetivo}>NOSSOS OBJETIVOS</span>
                        <h2 className={styles.texto2}>
                            Queremos fortalecer a confiança no uso do Pix, proporcionando aos usuários acesso rápido a informações públicas sobre denúncias de golpes. Nosso objetivo é atuar como um elo entre as pessoas e a segurança digital, sem prejudicar empresas ou instituições legítimas.


                        </h2>
                    </div>
                    <div className={styles.box3}>
                        <span className={styles.valores}>NOSSOS VALORES</span>
                        <h2 className={styles.texto3}>
                            •	Transparência: Informações claras, respeitando a veracidade e os direitos de todos.<br/>
                            •	Segurança: Proteção de dados e privacidade dos nossos usuários é prioridade absoluta.<br/>
                            •	Imparcialidade: Não emitimos julgamentos; apenas disponibilizamos informações registradas pelos próprios usuários.<br/>
                            •	Colaboração: Acreditamos na união entre pessoas, empresas, bancos e autoridades para combater fraudes.<br/>
                            •	Responsabilidade Legal: Operamos com respeito às leis vigentes, garantindo que nossos serviços não comprometam a integridade de investigações oficiais ou prejudiquem terceiros.
                        </h2>
                    </div>
                </section>
            </Container>
            <Footer />
        </>
    )
}
export default Sobre