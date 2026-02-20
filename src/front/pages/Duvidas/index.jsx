// C:\Projeto A3\SafePix\src\pages\Duvidas\index.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './Duvidas.module.css';
import Layout from '../../components/Layout';

function Duvidas() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'SafePix',
            text: 'Olá! Sou seu assistente SafePix. Como posso ajudar você hoje com suas dúvidas?'
        },
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => { 
        e.preventDefault();

        if (inputMessage.trim() === '') {
            return;
        }

        const userMessage = inputMessage.trim();
        const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const newUserMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: userMessage,
            time: currentTime
        };

        
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInputMessage(''); 
        setIsLoading(true); 

        try {
            
            const response = await fetch('http://localhost:4000/api/chat', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }),
            });

            if (!response.ok) {
                
                const errorData = await response.json();
                throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            const botResponseText = data.response; 

            const botMessage = {
                id: messages.length + 2, 
                sender: 'SafePix',
                text: botResponseText,
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };

            
            setMessages((prevMessages) => [...prevMessages, botMessage]);

        } catch (error) {
            console.error('Erro ao comunicar com o servidor:', error);
            const errorMessage = {
                id: messages.length + 2,
                sender: 'SafePix',
                text: `Desculpe, ocorreu um erro ao tentar obter uma resposta: "${error.message}". Por favor, tente novamente mais tarde.`,
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <>
            <Layout>
                <section className={styles.duvidasSection}>
                    <h2 className={styles.pageTitle}>Chat de Dúvidas</h2>
                    <div className={styles.chatContainer}>
                        <div className={styles.messagesList}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`${styles.messageBubbleContainer} ${
                                        message.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleSafePix
                                    }`}
                                >
                                    <div className={styles.messageBubble}>
                                        <p className={styles.messageText}>{message.text}</p>
                                        <span className={styles.messageTime}>{message.time}</span>
                                    </div>
                                </div>
                            ))}
                            {}
                            {isLoading && (
                                <div className={`${styles.messageBubbleContainer} ${styles.messageBubbleSafePix}`}>
                                    <div className={styles.messageBubble}>
                                        <p className={styles.messageText}>Digitando...</p>
                                    </div>
                                </div>
                            )}
                            {}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className={styles.inputArea}>
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder={isLoading ? "Aguardando resposta..." : "Digite sua mensagem..."}
                                className={styles.messageInput}
                                disabled={isLoading} 
                            />
                            <button type="submit" className={styles.sendButton} disabled={isLoading}>
                                {isLoading ? "Enviando..." : "Enviar"}
                            </button>
                        </form>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Duvidas;