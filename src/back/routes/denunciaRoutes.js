const express = require('express');
const router = express.Router();

// importamos o controller que já tem as regras de validação/serviço
const { criarDenuncia, verificarStatusPix } = require('../controllers/pixController');

// POST /api/denunciarPix
router.post('/denunciarPix', criarDenuncia);

// GET /api/verificarPix/:chavePix
router.get('/verificarPix/:chavePix', verificarStatusPix);

module.exports = router;
