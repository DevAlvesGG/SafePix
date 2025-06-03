// C:\Projeto A3\SafePix\src\db\connection.js

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("ERRO: Variável de ambiente MONGODB_URI não definida. Por favor, adicione-a ao seu arquivo .env na pasta src/back/.");
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    // >>> OPÇÕES TLS PARA TENTAR CONTORNAR O ERRO SSL/TLS <<<
    // IMPORTANTE: Use estas opções com CAUTELA e APENAS em ambiente de desenvolvimento/testes.
    // Elas podem diminuir a segurança da sua conexão em produção.
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true // CORREÇÃO AQUI: Mudado de TextTrackCue para true
});

let dbInstance;

async function connectToDatabase() {
    if (dbInstance) {
        console.log("Já conectado ao MongoDB. Reutilizando conexão.");
        return dbInstance;
    }
    try {
        console.log("Iniciando conexão com o MongoDB...");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Conexão bem-sucedida ao MongoDB!");
        dbInstance = client.db("SafePixDB");
        return dbInstance;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}

function getDb() {
    if (!dbInstance) {
        throw new Error("Cliente MongoDB não está conectado. Chame connectToDatabase primeiro.");
    }
    return dbInstance;
}

async function closeConnection() {
    if (client) {
        try {
            await client.close();
            console.log("Conexão com o MongoDB fechada.");
            dbInstance = null;
        } catch (error) {
            console.error("Erro ao fechar a conexão do MongoDB:", error);
        }
    }
}

module.exports = {
    connectToDatabase,
    getDb,
    closeConnection
};