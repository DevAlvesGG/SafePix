const { MongoClient } = require('mongodb'); 
const url = process.env.MONGODB_URL
if (!url) throw new Error('MONGODB_URL não definida no .env')

let client = null 
let dbInstance = null //vai servir para retornar uma instancia ja conectada

async function connectToDatabase() {
    try {
        if(!client) { //so conecta se ainda não conectou
            client = new MongoClient(url);
            await client.connect();
            dbInstance = client.db("SafePixDB")
            console.log('Conectado ao MongoDB')
        }

        return dbInstance;

    } catch (error) {
        throw new Error(`Erro ao conectar com o banco: ${error.message}`)
    }
}
    
function getDb() {
    if (!dbInstance) throw new Error('Conexão com MongoDB não encontrada, conecte-se ao MongoDB novamente');

    return dbInstance; 
}

async function closeConnectionToDatabase() {
    try {
        if(dbInstance) {
            await client.close();
            client = null;
            dbInstance = null;
            console.log('Conexão com o MongoDB fechada com sucesso.');
        }
    } catch (error) {
        throw new Error(`Erro ao encerrar a conexão com o MongoDB: ${error.message}`);
    }
}

module.exports = { connectToDatabase, getDb, closeConnectionToDatabase };