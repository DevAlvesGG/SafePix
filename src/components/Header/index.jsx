
import {Link} from 'react-router-dom' 
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/">
            <div className={styles.logoContainer}>
                <img className={styles.imgLogo} src="/Logofinal.png" alt="Imagem da logo" />
                <span>SafePix</span>
            </div>
            </Link>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/denuncia">Denúncia</Link>
                <Link to="/verificar">Verificar</Link>
                <Link to="/duvidas" className={styles.link}>Dúvidas</Link>
            </nav>
        </header>
    );
}

export default Header;