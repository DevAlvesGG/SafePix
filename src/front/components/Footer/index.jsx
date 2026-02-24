
import style from './Footer.module.css'

function Footer() {
    return (
        <footer className={style.footer}>

            <div className={style.footerContainer}>
                <div className={`${style.footerCol} ${style.brandCol}`}>
                    <div className={style.footerLogo}>
                         <span className={style.logoText}>SafePix</span>
                    </div>
                    <p className={style.brandDesc}>Sua parceira inteligente na proteção de transações financeiras. Analisamos e verificamos para você não cair em golpes.</p>
                </div>
                
                <div className={style.footerCol}>
                    <h4>Navegação</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/sobre">Sobre nós</a></li>
                        <li><a href="/denuncia">Fazer Denúncia</a></li>
                        <li><a href="/verificar">Verificar Chave</a></li>
                        <li><a href="/faq">Dúvidas (FAQ)</a></li>
                    </ul>
                </div>

                <div className={style.footerCol}>
                    <h4>Transparência</h4>
                    <ul>
                        <li><a href="#">Termos de Uso</a></li>
                        <li><a href="#">Política de Privacidade</a></li>
                        <li><a href="#">Dicas de Segurança</a></li>
                        <li><a href="#">Trabalhe Conosco</a></li>
                    </ul>
                </div>

                <div className={`${style.footerCol} ${style.contactCol}`}>
                    <h4>Precisa de Ajuda?</h4>
                    <p>Nossa equipe está pronta para ajudar.</p>
                    <a href="mailto:suporte@safepix.com.br" className={style.contactEmail}>suporte@safepix.com.br</a>
                </div>

                <div class="footer-bottom">
                    <div class="bottom-content">
                        <p>&copy; 2026 SafePix. Todos os direitos reservados.</p>
                        <p class="slogan">Visando sempre a segurança do seu dinheiro!</p>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer