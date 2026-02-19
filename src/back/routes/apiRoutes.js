const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// instância do modelo Gemini (se houver chave setada)
const API_KEY = process.env.GEMINI_API_KEY;
let geminiModel;
if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} else {
    console.warn('AVISO: GEMINI_API_KEY não definida. /api/chat não funcionará.');
}

// rota de chat utilizando o Gemini
router.post('/chat', async (req, res) => {
    if (!geminiModel) {
        return res.status(500).json({
            error: 'API Key do Gemini não configurada. O serviço de chat não pode ser usado.'
        });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'O prompt é obrigatório para o chat com o Gemini.' });
    }

    try {
        console.log(`Recebendo prompt para Gemini: "${prompt}"`);
        const result = await geminiModel.generateContent(prompt);
        const responseText = result.response.text();
        console.log(`Resposta do Gemini: "${responseText}"`);
        res.json({ response: responseText });
    } catch (error) {
        console.error('Erro ao chamar a API Gemini:', error);
        res.status(500).json({
            error: 'Erro ao gerar a resposta do AI. Verifique sua chave API do Gemini e o uso.'
        });
    }
});

module.exports = router;
