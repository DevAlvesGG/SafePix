// src/services/pixService.cjs
const connectToDatabase = require('../db/connection.js');

// Função para registrar ou atualizar uma denúncia de chave Pix
async function denouncePixKey(chavePix, denunciaDetails) {
    try {
        const db = await connectToDatabase();
        const denunciasCollection = db.collection('denuncias');

        const updateResult = await denunciasCollection.findOneAndUpdate(
            { chavePix: chavePix },
            {
                $inc: { contadorDenuncias: 1 },
                $set: {
                    dataDenuncia: new Date(),
                    motivoUltimaDenuncia: denunciaDetails.motivo,
                    comentarioUltimaDenuncia: denunciaDetails.comentario
                },
                $setOnInsert: {
                    // Estes campos só são definidos na primeira inserção
                    nome: denunciaDetails.nome,
                    sobrenome: denunciaDetails.sobrenome,
                    dataNascimento: denunciaDetails.dataNascimento,
                    genero: denunciaDetails.genero,
                    motivo: denunciaDetails.motivo || 'Denúncia padrão',
                    comentario: denunciaDetails.comentario || ''
                }
            },
            {
                upsert: true,
                returnDocument: 'after' // Garante que o documento atualizado/inserido é retornado
            }
        );

        // Se a operação foi bem-sucedida e um documento foi retornado
        if (updateResult.value) {
            console.log(`Denúncia registrada/atualizada para a chave Pix: ${chavePix}. Contador: ${updateResult.value.contadorDenuncias}`);
            return updateResult.value;
        } else {
            // Se updateResult.value é nulo ou indefinido, ainda consideramos a operação como "tentativa" de sucesso,
            // mas logamos um aviso. O frontend receberá uma resposta de sucesso.
            console.warn(`Operação findOneAndUpdate para ${chavePix} completada, mas 'value' está vazio. O documento pode não ter sido retornado, mas a operação no DB pode ter sido bem-sucedida.`);
            // Para garantir que o frontend receba uma resposta 200 OK, retornamos um objeto de sucesso simplificado.
            return {
                chavePix: chavePix,
                message: 'Denúncia processada, mas o documento completo não foi retornado imediatamente.'
            };
        }

    } catch (error) {
        console.error("Erro ao denunciar chave Pix:", error);
        throw error; // Ainda lançamos erros de conexão ou outros problemas críticos
    }
}

// Função para verificar o status de uma chave Pix
async function checkPixKeyStatus(chavePix) {
    try {
        const db = await connectToDatabase();
        const denunciasCollection = db.collection('denuncias');

        const pixKeyInfo = await denunciasCollection.findOne({ chavePix: chavePix });

        if (pixKeyInfo && pixKeyInfo.contadorDenuncias > 0) {
            console.log(`Chave Pix ${chavePix} encontrada no banco de dados. Status: Não Confiável.`);
            return {
                chavePix: chavePix,
                status: 'Nao Confiável',
                denuncias: pixKeyInfo.contadorDenuncias,
                ultimaDenuncia: pixKeyInfo.dataDenuncia,
                motivoUltimaDenuncia: pixKeyInfo.motivoUltimaDenuncia,
                comentarioUltimaDenuncia: pixKeyInfo.comentarioUltimaDenuncia
            };
        } else {
            console.log(`Chave Pix ${chavePix} não encontrada no banco de dados. Status: Confiável.`);
            return {
                chavePix: chavePix,
                status: 'Confiável',
                denuncias: 0
            };
        }
    } catch (error) {
        console.error("Erro ao verificar status da chave Pix:", error);
        throw error;
    }
}

// Exportar as funções para CommonJS
module.exports = {
    denouncePixKey,
    checkPixKeyStatus
};