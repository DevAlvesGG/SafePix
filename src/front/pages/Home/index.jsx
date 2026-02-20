import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import Layout from '../../components/Layout'

function Home() {
    return (
        <>
            <Layout>
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
            </Layout>
        </>
    )
}

export default Home
