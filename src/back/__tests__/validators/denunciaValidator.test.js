const { checkDataComplaint } = require('../../validators/denunciaValidator');

describe('checkDataComplaint', () => {

    it('deve retornar valid true quando todos os campos são válidos',() => {
        const denuncia = {
            chavePix: 'abc123',
            nome: 'João Silva',
            motivo: 'Fraude'
        };

        const resultado = checkDataComplaint(denuncia);
        expect(resultado.valid).toBe(true);
    })

    it('deve retornar valid false quando chavePix está vazia', () => {
        const denuncia = {
            chavePix: '',
            nome: 'João Silva',
            motivo: 'Fraude'
        };

        const resultado = checkDataComplaint(denuncia);
        expect(resultado.valid).toBe(false);
    })

    it('deve retornar valid false quando nome está vazia', () => {
        const denuncia = {
            chavePix: 'abc123',
            nome: '',
            motivo: 'Fraude'
        };

        const resultado = checkDataComplaint(denuncia);
        expect(resultado.valid).toBe(false);
    }) 
        
    it('deve retornar valid false quando motivo está vazio', () => {
        const denuncia = {
            chavePix: 'abc123',
            nome: 'João Silva',
            motivo: ''
        };

        const resultado = checkDataComplaint(denuncia);
        expect(resultado.valid).toBe(false);
    })

    it('deve retornar valid false quando todos campos está vazio', () => {
        const denuncia = {
            chavePix: '',
            nome: '',
            motivo: ''
        };

        const resultado = checkDataComplaint(denuncia);
        expect(resultado.valid).toBe(false);
    })
})