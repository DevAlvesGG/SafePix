const complaints = {

    //return allcomplaints



    //return complaint by id



    
    /*
    method: POST
    route: /api/denunciarPix

    --create a new complaint
    */
    //create complaint
    createComplaint: async (pixKey, denunciaData) => {
        try {
            const db = getDb();
            const collection = db.collection('denunciasPix');
            const documentToInsert = {
                chavePix: pixKey,
                ...denunciaData,
                dataDenuncia: new Date()
            };
            console.log(`Inserindo documento de denúncia: ${documentToInsert}`);
            const result = await collection.insertOne(documentToInsert);
            console.log(`Denúncia registrada com sucesso`
            );
            return result;
        } catch (error) {
            throw new Error('Erro ao criar denuncia: ' + error.message)
        }
    },



    //update complaint



    //delete complaint


    //verify status pix key
    checkPixKey: async (pixKey) => {
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

    }, 
    
}