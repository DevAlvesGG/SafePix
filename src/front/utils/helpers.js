/**
 * Valida se uma string é uma chave Pix válida
 * @param {string} chave - A chave Pix a validar
 * @returns {boolean}
 */
export function isValidPixKey(chave) {
    if (!chave || typeof chave !== 'string') return false;

    const patterns = {
        cpf: /^\d{11}$/,
        cnpj: /^\d{14}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{11}$/,
    };

    return Object.values(patterns).some(pattern => pattern.test(chave));
}

/**
 * Formata uma data para exibição
 * @param {Date|string} date - Data a formatar
 * @returns {string}
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/**
 * Formata uma data com hora
 * @param {Date|string} date - Data a formatar
 * @returns {string}
 */
export function formatDateTime(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

/**
 * Trunca um texto com reticências
 * @param {string} text - Texto a truncar
 * @param {number} length - Comprimento máximo
 * @returns {string}
 */
export function truncateText(text, length = 100) {
    return text.length > length ? `${text.substring(0, length)}...` : text;
}
