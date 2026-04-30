const { getDb } = require('../config/database')
const { BSON: { ObjectId } } = require('mongodb');
const { checkDataComplaint } = require('../validators/denunciaValidator');

const complaints = {

    //return allcomplaints



    //return complaint by id



    
    /*
    method: POST
    route: /api/denunciarPix

    --create a new complaint
    */
    //create complaint
    createComplaint: async (complaintData) => {
        try {
            //valida os dados da denúncia antes de inserir no banco
            const validate = checkDataComplaint(complaintData);
            if(!validate.valid) {
                throw new Error(`Dados da denúncia inválidos: ${validate.errors.join(', ')}`);
            }

            const db = getDb();
            const collection = db.collection('denunciasPix');
            const documentToInsert = {
                chavePix: complaintData.chavePix,
                nome: complaintData.nome,
                sobrenome: complaintData.sobrenome,
                dataNascimento: complaintData.dataNascimento,
                genero: complaintData.genero,
                motivo: complaintData.motivo,
                comentario: complaintData.comentario,
                dataDenuncia: new Date()
            };
            const result = await collection.insertOne(documentToInsert);
            return result;
        } catch (error) {
            throw new Error('Erro ao criar denuncia: ' + error.message)
        }
    },



    //update complaint

    



    //delete complaint

    deleteComplaint: async (id) => {
        try {
            const db = getDb()
            const result = await db.collection('denunciasPix').deleteOne({ _id: new ObjectId(id) })
            if (result.deletedCount === 0) throw new Error('Denúncia Não Encontrada')  

            return result

        } catch (error) {
            throw new Error(`Erro ao Deletar Denúncia: ${error.message}`)
        }
    },

    //verify status pix key
    checkPixKey: async (pixKey) => {
        try {
            const db = getDb();
            const collection = db.collection('denunciasPix');
            const count = await collection.countDocuments({ chavePix: pixKey });

            if (count > 0) {
                const lastDenuncia = await collection.findOne(
                    { chavePix: pixKey },
                    { sort: { dataDenuncia: -1 } } 
                );

                if(!lastDenuncia) {
                    return { status: 'Não Denunciada' };
                }

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
            throw new Error(`Erro ao verificar status da chave Pix: ${error.message}`);
        }

    }, 
    
}

module.exports = complaints;
