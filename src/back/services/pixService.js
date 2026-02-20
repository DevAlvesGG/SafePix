

const { getDb } = require('../config/database');

async function denouncePixKey(pixKey, denunciaData) {
    try {
        const db = getDb();
        const collection = db.collection('denunciasPix');

        const documentToInsert = {
            chavePix: pixKey,
            ...denunciaData,
            dataDenuncia: new Date()
        };

        console.log("Tentando inserir documento de denúncia:", documentToInsert);
        const result = await collection.insertOne(documentToInsert);
        console.log(`Denúncia registrada com sucesso para a chave Pix ${pixKey}. Inserido ID: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error('Erro ao denunciar chave Pix:', error);
        throw error;
    }
}


async function checkPixKeyStatus(pixKey) {
    try {
        const db = getDb();
        const collection = db.collection('denunciasPix');

        console.log(`Verificando status para chave Pix: ${pixKey}`);

       
        const count = await collection.countDocuments({ chavePix: pixKey });

        if (count > 0) {
            
            const lastDenuncia = await collection.findOne(
                { chavePix: pixKey },
                { sort: { dataDenuncia: -1 } } 
            );
            
            return {
                status: 'Denunciada',
                denuncias: count,
                motivoUltimaDenuncia: lastDenuncia.motivo,
                comentarioUltimaDenuncia: lastDenuncia.comentario,
                ultimaDenuncia: lastDenuncia.dataDenuncia,
                nome: lastDenuncia.nome, 
                sobrenome: lastDenuncia.sobrenome, 
            };
        } else {
            
            return { status: 'Não Denunciada' };
        }
    } catch (error) {
        console.error('Erro ao verificar status da chave Pix:', error);
        throw error;
    }
}

module.exports = {
    denouncePixKey,
    checkPixKeyStatus
};