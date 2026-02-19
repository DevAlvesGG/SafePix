const express = require('express');
const router = express.Router();

// importamos o controller que já tem as regras de validação/serviço
const pixController = require('../controllers/pixController');

// POST /api/denunciarPix
router.post('/denunciarPix', pixController.criarDenuncia);

// GET /api/verificarPix/:chavePix
router.get('/verificarPix/:chavePix', pixController.verificarStatusPix);

module.exports = router;
