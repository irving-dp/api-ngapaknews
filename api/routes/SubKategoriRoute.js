const express = require('express');
const router  = express.Router();

//inport controller
const SubKategoriController = require('../controller/SubKategoriController');

//handle incoming request /sub-kategori
router.get('/', SubKategoriController.getData);
router.get('/:id', SubKategoriController.getDataById);
router.post('/', SubKategoriController.store);
router.patch('/:id', SubKategoriController.update);
router.delete('/:id', SubKategoriController.delete);

module.exports = router;