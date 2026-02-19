const { MongoClient, ServerApiVersion } = require('mongodb'); 

const url = process.env.MONGODB_URL

 if(!url) throw new Error('MONGODB_URL não encontrado.')

let dbInstance = null;
let mongoClient = null;

async function connectToDatabase() {
    try {
        mongoClient = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    
    await mongoClient.connect();
    dbInstance = mongoClient.db('SafePixDB');
    return dbInstance;

} catch (error) {
    console.error('Erro ao conectar ao MongoDb')
}
    
}


function getDb() {
    if(!dbInstance) throw new Error('DB não encontrado. Conecte-se ao banco de dados primeiro usando connectToDatabase().');

    return dbInstance;
}

async function closeConnectionToDatabase() {
    try {
        if(mongoClient) {
            await mongoClient.close();
            mongoClient = null;
        }

        dbInstance = null;
        console.log('Conexão com o MongoDB fechada com sucesso.');

    } catch (error) {
        console.error('Erro ao fechar a conexão com o mongo DB', error);
    }
}

module.exports = { connectToDatabase, getDb, closeConnectionToDatabase };