const express = require('express');
const router = express.Router();
//const checkAuth = require('../middlewere/check-auth');

//import controller
const KategoriController = require('../controller/KategoriController');

//handle incoming request /kategori-berita
router.get('/', KategoriController.getData);
router.get('/:id', KategoriController.getDataById);
router.post('/', KategoriController.store);
router.patch('/:id', KategoriController.update);
router.delete('/:id', KategoriController.delete);

module.exports = router;