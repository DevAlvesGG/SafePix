function checkDataComplaint(denuncia) {
    const errors = [];

    if(!denuncia.chavePix || denuncia.chavePix.trim() === '') {
        errors.push('A chave Pix é obrigatória.');
    }
    
    if (!denuncia.nome || denuncia.nome.trim() === '') {
        errors.push('O nome do denunciante é obrigatório');
    }

    if (!denuncia.motivo || denuncia.motivo.trim() === '') {
        errors.push('O motivo da denúncia é obrigatório');
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

module.exports = { checkDataComplaint };