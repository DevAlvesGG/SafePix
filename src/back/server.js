
    require('dotenv').config({ path: './.env' });

    const express = require('express');
    const cors = require('cors');
    const errorHandler = require('./middlewares/errorHandler');

    const { connectToDatabase, closeConnection } = require('./config/database');



    const app = express();
    const port = process.env.PORT || 4000;


    app.use(express.json()); 
    app.use(cors());

    // demais rotas da API foram extraídas para um arquivo próprio para manter server.js mais enxuto
    const apiRoutes = require('./routes/apiRoutes');
    app.use('/api', apiRoutes);

    // rotas de denúncia agora estão em arquivo separado
    const denunciaRoutes = require('./routes/denunciaRoutes');
    app.use('/api', denunciaRoutes);

    // outras rotas específicas podem ser adicionadas abaixo ou em arquivos próprios










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