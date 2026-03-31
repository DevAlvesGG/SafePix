// devo importar minha conexao com o mongodb
const db = require('../config/database')
const { BSON: { ObjectId } } = require('mongodb');
const bcrypt = require('bcrypt')

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

    //create new user
    createUser: async (email, password) => {
        try {
            const database = db.getDb();

            //valida o tipo das credenciais 
            //if(typeof email !== 'string' || typeof password !== 'string') throw new Error('Credenciais Precisam Ser String');

            //valida se email ja esta cadastrado
            const existingUser = await database.collection('users').findOne({ email });
            if(existingUser) {
                throw new Error('Email já cadastrado.');
            }

            //criptografa a password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await database.collection('users').insertOne({
                email: email,
                password: hashedPassword,
                createdAt: new Date()
            });

            return user;
            
        } catch (error) {
            throw new Error(`Erro ao Criar Usuário: ${error.message}`)
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
    },

    //return user by email
    findUserByEmail: async (email) => {
        try {
            const database = db.getDb();
            const user = await database.collection('users').findOne({email: email})

            if (!user) throw new Error('E-mail Não Encontrado.')

            return user;

        } catch (error) {
            
        }
    }
}

module.exports = userModel