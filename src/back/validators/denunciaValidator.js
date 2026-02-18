function validarDenuncia(denuncia) {
    const errors = [];

    if(!denuncia.chavePix || denuncia.chavePix.trim() === '') {
        errors.push('A chave Pix é obrigatória.');
    }

    if (!denuncia.nome || denuncia.nome.trim() === '') {
        errors.push('Nome é obrigatório');
    }

    if (!denuncia.motivo || denuncia.motivo.trim() === '') {
        errors.push('Motivo é obrigatório');
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

module.exports = { validarDenuncia };