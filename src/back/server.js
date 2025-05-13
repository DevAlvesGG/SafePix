require('dotenv').config() //carrega as variáveis de ambiente do arquivo .env
const express = require('express')
const { GoogleGenAI } = require('@google/genai')
const app = express()
app.use(express.json()) //para receber JSON no body da requisição

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

//Endpoint GET /hello-word
app.get('/hello-world', (req, res) => {
   res.json({message: `Hello World!`})
});

app.listen(4000, () => console.log('Servidor rodando na porta 4000'))