const { denouncePixKey, checkPixKeyStatus } = require('../services/pixService');

const { validarDenuncia } = require('../validators/denunciaValidator');

// POST /api/denunciarPix
async function criarDenuncia(req, res) {
    try {
        const { chavePix, nome, sobrenome, dataNascimento, genero, motivo, comentario } = req.body;

        //valida os dados da denuncia usando a função de validação
        const validacao = validarDenuncia({
            chavePix,
            nome,
            motivo,
        });

        //se não passou na validacao, retorna os erros encontrados
        if(!validacao.valid) {
            return res.status(400).json({ message: 'Dados inválidos', errors: validacao.errors
            })
        }
        //se passou da validacao, tenta criar a denuncia
        const result = await denouncePixKey(chavePix, {
            nome,
            sobrenome,
            dataNascimento,
            genero,
            motivo,
            comentario
        })

        res.status(201).json({ message: 'Denuncia registrada com Sucesso!', data: result});

    } catch (error) {
        console.error('Erro em criar denuncia:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao processar a denúncia.', error: error.message });
    }
}

async function verificarStatusPix(req, res) {
    try {
        const { chavePix } = req.params;

        //validação simples para garantir que a chave Pix foi fornecida
        if(!chavePix || chavePix.trim() === '') {
            return res.status(400).json({ message: 'Chave Pix é obrigatória para verificações.'});
        }

        const statusPix = await checkPixKeyStatus(chavePix);
        res.status(200).json(statusPix);
        
    } catch (error) {
        console.error('Erro em verificar status da chave Pix: ', error);

        res.status(500).json({ message: 'Erro interno do servidor ao verificar o status da chave Pix.', error: error.message});
    }
}

module.exports = {
    criarDenuncia,
    verificarStatusPix
}