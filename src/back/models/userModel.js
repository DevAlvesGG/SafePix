// devo importar minha conexao com o mongodb
const db = require('../config/database')
const { BSON: { ObjectId } } = require('mongodb');

const userModel = {

    //return all user
    findAllUsers: async () => {
        try {
            const database = db.getDb();
            const result = await database.collection('users').find({}).toArray();//como se o find fosse o indice dos dados e o toArray me mostra os dados em base no find.
            return result;
        } catch (error) {
            throw new Error(`Erro ao Retornar Usuários: ${error.message}`)
        }
    },

    //return user by id
    findUserById: async (id) => {
        try {
            const database = db.getDb();
            const result = await database.collection('users').findOne({_id: new ObjectId(id)});
            if (!result) throw new Error('Usuário Não Encontrado')

            return result;

        } catch (error) {
            throw new Error(`Erro ao Buscar Usuário: ${error.message}`);
        } 
    },

    //update user
    update: async (id, userToUpdate) => {
        //Operador $set — diz ao MongoDB quais campos atualizar. Sem ele, você sobrescreveria o documento inteiro

        //matchedCount — quantos documentos o filtro encontrou

        //modifiedCount — quantos foram de fato modificados
        try {
            const database = db.getDb();
            const update = await database.collection('users').updateOne(
                { _id: new ObjectId(id) }, //filtro - qual documento atualizar
                { $set: userToUpdate } //o que atualizar
            )

            if (update.matchedCount === 0) throw new Error('Usuário Não encontrado')
            
            return update;

        } catch (error) {
            throw new Error(`Erro ao Atualizar Usuário: ${error.message}`)
        }
    },

    //delete user
    delete: async (id) => {
        try {
            const database = db.getDb()
            const result = await database.collection('users').deleteOne({ _id: new ObjectId(id) })

            if (result.deletedCount === 0) throw new Error('Usuário Não Encontrado')
            
            return result

        } catch (error) {
            throw new Error(`Erro ao Deletar Usuário: ${error.message}`)
        }
    }
}

module.exports = userModel