const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = {
    //GET /auth/login
    login: (req, res) => {
        const { email, password } = req.params;

        //valido se o user existe
        const existingUser = userModel.findUserByEmail(email);

        if (!existingUser) {
            res.status(400).json({ message: 'Usuário Não Cadastrado'})
        }

        //compara se a senha criptografada é igual a senha do usuario
        const validPassword = bcrypt.compareSync(password, existingUser.password)

        if (!validPassword)  {
            res.status(400).json({ message: 'Usuário ou Senha Inválida'})
        }

        const payload = { email: existingUser.email, id: existingUser.id };
        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'} );

        res.jso(token);
    },

    //POST /auth/register
    register: (req, res) => {
        const { email, password } = req.params;
        const newUser = userModel.createUser(email, password);

        return res.status(201).json(newUser);
    }
}