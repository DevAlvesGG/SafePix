const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// POST /api/denunciarPix
router.post('/denunciarPix', complaintController.createComplaintPix);

// GET /api/verificarPix/:chavePix
router.get('/verificarPix/:chavePix', complaintController.checkStatusPix);

// DELETE /api/excluirDenuncia/:id
router.delete('/excluirDenuncia/:id', complaintController.deleteComplaintPix);

module.exports = router;
