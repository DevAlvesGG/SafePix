import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import Layout from '../../components/Layout'
import Button from '../../components/Button/Button';

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
                        <Button as={Link} to='/sobre' className={styles.btn_custom}>
                            Saiba Mais sobre mim
                        </Button>
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
