import Header from './../../components/Header'
import Footer from './../../components/Footer'
import { Link } from 'react-router-dom'
import Container from './../../components/Container'
import styles from './Home.module.css'
function Home() {
    return (
        <>
            <Header />
            <Container>
                <section className={styles.home}>

                    <div className={styles.apresentacao}>
                        <p>Olá, somos a <br />
                            <span>SafePix</span> <br />
                            Ajudando você
                        </p>
                        <Link to='/sobre' className={`${styles.btn} ${styles.btn_roxo}`}>
                            Saiba Mais sobre mim
                        </Link>
                    </div>
                    <figure>
                        <img className='img-logo' src="/Logofinal.png" alt="Imagem da logo" />
                    </figure>

                </section>
            </Container>
            <Footer />
        </>
    )


}

export default Home
