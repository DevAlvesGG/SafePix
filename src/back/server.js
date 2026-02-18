
    require('dotenv').config({ path: './.env' });

    const express = require('express');
    const cors = require('cors');
    const { GoogleGenerativeAI } = require('@google/generative-ai');

    const errorHandler = require('./middlewares/errorHandler');

    const { connectToDatabase, closeConnection } = require('../config/database');



    const app = express();
    const port = process.env.PORT || 4000;


    app.use(express.json()); 
    app.use(cors());

 
    const API_KEY = process.env.GEMINI_API_KEY;

    
    if (!API_KEY) {
        console.error("ERRO: A chave de API do Gemini não foi encontrada no arquivo .env. Por favor, adicione GEMINI_API_KEY.");
    }

    let geminiModel;
    if (API_KEY) {
        const genAI = new GoogleGenerativeAI(API_KEY);
        geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }



    app.post('/api/chat', async (req, res) => {
        if (!geminiModel) {
            return res.status(500).json({ error: "API Key do Gemini não configurada. O serviço de chat não pode ser usado." });
        }

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "O prompt é obrigatório para o chat com o Gemini." });
        }

        try {
            console.log(`Recebendo prompt para Gemini: "${prompt}"`);
            const result = await geminiModel.generateContent(prompt);
            const responseText = result.response.text();

            console.log(`Resposta do Gemini: "${responseText}"`);
            res.json({ response: responseText });

        } catch (error) {
            console.error("Erro ao chamar a API Gemini:", error);
            res.status(500).json({ error: "Erro ao gerar a resposta do AI. Verifique sua chave API do Gemini e o uso." });
        }
    });

    // rotas de denúncia agora estão em arquivo separado
    const denunciaRoutes = require('./routes/denunciaRoutes');
    app.use('/api', denunciaRoutes);










    app.get('/', (req, res) => {
        res.send('Servidor SafePix Backend está funcionando!');
    });

    app.use(errorHandler);

    async function startServer() {
        console.log("Iniciando servidor SafePix Backend...");
        try {
            await connectToDatabase();
            console.log("Conexão com o MongoDB estabelecida com sucesso!");

            app.listen(port, () => {
                console.log(`Servidor Express rodando na porta ${port}. Conectado ao MongoDB.`);
                if (!API_KEY) {
                    console.warn("AVISO: A chave de API do Gemini não foi definida no .env. O endpoint /api/chat NÃO funcionará.");
                }
            });
        } catch (error) {
            console.error("Falha ao iniciar o servidor ou conectar ao banco de dados:", error);
            process.exit(1);
        }
    }

    startServer();

    process.on('SIGINT', async () => {
        console.log('\nDesligamento do servidor detectado (SIGINT). Fechando conexão com o banco de dados...');
        await closeConnection(); 
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('\nDesligamento do servidor detectado (SIGTERM). Fechando conexão com o banco de dados...');
        await closeConnection();
        process.exit(0);
    });

    process.on('uncaughtException', (err) => {
        console.error('Erro não capturado (uncaughtException):', err);
        closeConnection().finally(() => { 
            process.exit(1);
        });
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Rejeição de promessa não tratada (unhandledRejection):', reason);
    });