function errorHandler(err, req, res, next) {
    //log simples para ver o erro no terminal
    console.error('Erro capturado pelo erroHandler:', err);

    //usa o status caso o erro tenha, se não usa o status 500 como padrão
    const status = err && err.status ? err.status : 500;

    //usa a mensagem do erro caso tenha, se não usa uma mensagem padrão
    const message = err && err.message ? err.message : 'Erro interno do Servidor';

    res.status(status).json({ message: message });
}

module.exports = errorHandler;