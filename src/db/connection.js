// src/db/connection.js
const { MongoClient, ServerApiVersion } = require('mongodb'); // Usar require

// Mantenha esta URL em uma variável de ambiente (ex: .env) para segurança em produção!
const uri = process.env.MONGODB_URI; // Sua string de conexão completa

// Crie um MongoClient com um objeto MongoClientOptions para definir o Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("denunciasPix");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    await client.close();
    process.exit(1);
  }
}

module.exports = connectToDatabase; // Usar module.exports