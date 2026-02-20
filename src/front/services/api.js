// Configuração da API
const API_BASE_URL = 'http://localhost:4000/api';

// Funções para requisições à API

/**
 * Realiza uma denúncia de Pix fraudulento
 * @param {Object} denunciaData - Dados da denúncia
 * @returns {Promise}
 */
export async function criarDenuncia(denunciaData) {
    try {
        const response = await fetch(`${API_BASE_URL}/denunciarPix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(denunciaData),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar denúncia:', error);
        throw error;
    }
}

/**
 * Verifica o status de uma chave Pix
 * @param {string} chavePix - Chave Pix a verificar
 * @returns {Promise}
 */
export async function verificarPix(chavePix) {
    try {
        const response = await fetch(`${API_BASE_URL}/verificarPix/${encodeURIComponent(chavePix)}`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao verificar Pix:', error);
        throw error;
    }
}

/**
 * Envia um prompt para o assistente de IA (Gemini)
 * @param {string} prompt - Texto do prompt
 * @returns {Promise}
 */
export async function chatWithAI(prompt) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao chamar IA:', error);
        throw error;
    }
}
