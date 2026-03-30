require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { connectToDatabase, closeConnectionToDatabase } = require('./config/database');
const complaintRoutes = require('./routes/complaintRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes')
    
const app = express();
const port = process.env.PORT || 4000;

//config para ler json
app.use(express.json()); 
app.use(cors());
    
//config de rotas
app.use('/auth', authRoutes)
app.use('/api', complaintRoutes);//rotas de denuncia
app.use('/api', apiRoutes);//essa rota não vai existir, atualmente se comunica com o gemini

// config para tratamento de erros
app.use(errorHandler);

//função para startar o servidor 
async function startServer() {
    console.log("Iniciando servidor SafePix");
    try {
        await connectToDatabase();
        console.log("Conexão com o MongoDB estabelecida com sucesso!");

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}.`);
        });
    } catch (error) {
        throw new Error(`Erro ao iniciar o servidor: ${error.message}`)
    }
}

startServer();
