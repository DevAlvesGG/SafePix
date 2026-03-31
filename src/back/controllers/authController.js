const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = {
    //GET /auth/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            //valido se o user existe
            const existingUser = await userModel.findUserByEmail(email);
            if (!existingUser) {
                res.status(400).json({ message: 'Usuário Não Cadastrado'});
            }

            //compara se a senha criptografada é igual a senha do usuario
            const validPassword = bcrypt.compareSync(password, existingUser.password)
            if (!validPassword)  {
                res.status(400).json({ message: 'Usuário ou Senha Inválida'})
            }

            const payload = { email: existingUser.email, id: existingUser.id };
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'} );
            res.json(token);

        } catch (error) {
            res.status(500).json({ message: `Erro ao Fazer Login: ${error.message}`})
        }
    },

    //POST /auth/register
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const newUser = await userModel.createUser(email, password);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao Cadastrar Usuário: ${error.message}`})
        }  
    }
}