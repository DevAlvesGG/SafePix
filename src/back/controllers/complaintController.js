const { createComplaint, checkPixKey, deleteComplaint } = require('../models/complaintModel');

module.exports = {

// POST /api/denunciarPix -- create new complaint
    createComplaintPix: async (req, res) => {
        try {
            const { chavePix, nome, sobrenome, dataNascimento, genero, motivo, comentario } = req.body;
            const complaintData = { 
                //Em JavaScript moderno, quando a chave e a variável têm o mesmo nome, você pode simplificar, Isso se chama shorthand property
                chavePix,
                nome,
                sobrenome,
                dataNascimento,
                genero,
                motivo,
                comentario
            };
            const create = await createComplaint(complaintData);
            if(!create) {
                return res.status(400).json({ message: 'Erro ao criar denúncia.' });
            }
            res.status(201).json({ message: 'Denuncia registrada com Sucesso!', data: create});

        } catch (error) {
            if(error.message.includes('inválidos')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Erro interno do servidor ao criar denuncia.', error: error.message})
        }
    },

    // GET /api/verificarPix/:chavePix -- check complaint status by Pix key
    checkStatusPix: async(req, res) => {
        try {
            const { chavePix } = req.params;

            //validação simples para garantir que a chave Pix foi fornecida
            if(!chavePix || chavePix.trim() === '') {
                return res.status(400).json({ message: 'Chave Pix é obrigatória para verificações.'});
            }

            const statusPix = await checkPixKey(chavePix);
            res.status(200).json(statusPix);
            
        } catch (error) {
            console.error('Erro em verificar status da chave Pix: ', error);

            res.status(500).json({ message: 'Erro interno do servidor ao verificar o status da chave Pix.', error: error.message});
        }
    },

    // DELETE /api/excluirDenuncia/:id
    deleteComplaintPix: async (req, res) => {
        try {
            const { id } = req.params;  
            // Validação simples para garantir que a chave Pix foi fornecida
            if (!id) {
                return res.status(400).json({ message: 'ID é obrigatório para exclusão.' });
            }  
            const deleteResult = await deleteComplaint(id)
            res.status(200).json({ message: 'Denúncia excluída com sucesso.', data: deleteResult });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor ao excluir denúncia.', error: error.message });
        }

    }
};

