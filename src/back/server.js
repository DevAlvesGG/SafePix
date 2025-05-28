require('dotenv').config() //carrega as variáveis de ambiente do arquivo .env
const cors = require('cors') //importa o cors
const express = require('express')
const { GoogleGenAI } = require('@google/genai')
const app = express()
const { denouncePixKey, checkPixKeyStatus } = require('../services/pixService.js'); // Adicionado .js
app.use(express.json()) //para receber JSON no body da requisição
app.use(cors()); //habilita o CORS para todas as requisições

//endpoint: método HTTP, padrãp de acesso, funcionalidades
//GET, POST, PUT, DELETE
//usjt.br/notas
//funcionalidade () => {}

  //Endpoint POST /pergunte-ao-gemini
app.post('/pergunte-ao-gemini', async (req, res) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) //instancia a classe GoogleGenAI com a chave da API;
    const prompt = req.body.prompt  //pega o prompt do body da requisição
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      res.json({"resposta": response.text})
})

// NOVO ENDPOINT: Rota para Denunciar uma Chave Pix (POST /denunciarPix)
app.post('/denunciarPix', async (req, res) => {
    // Pega todos os dados do body da requisição
    const { chavePix, nome, sobrenome, dataNascimento, genero, motivo, comentario } = req.body;

    // Validação básica
    if (!chavePix || !motivo) {
        return res.status(400).json({ message: 'Chave Pix e Motivo da Denúncia são obrigatórios.' });
    }

    try {
        // Chama a função do serviço Pix, passando todos os detalhes
        const result = await denouncePixKey(chavePix, {
            nome,
            sobrenome,
            dataNascimento,
            genero,
            motivo,
            comentario
        });
        res.status(200).json({ message: 'Denúncia registrada com sucesso!', data: result });
    } catch (error) {
        console.error('Erro na rota /denunciarPix:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao processar a denúncia.', error: error.message });
    }
});

// NOVO ENDPOINT: Rota para Verificar o Status de uma Chave Pix (GET /verificarPix/:chavePix)
app.get('/verificarPix/:chavePix', async (req, res) => {
    const { chavePix } = req.params; // Pega a chave Pix da URL

    if (!chavePix) {
        return res.status(400).json({ message: 'Chave Pix é obrigatória para verificação.' });
    }

    try {
        const status = await checkPixKeyStatus(chavePix);
        res.status(200).json(status);
    } catch (error) {
        console.error('Erro na rota /verificarPix:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao verificar o status da chave Pix.', error: error.message });
    }
});


app.listen(4000, () => console.log('Servidor rodando na porta 4000'))