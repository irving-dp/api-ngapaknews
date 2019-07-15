const express = require('express');
const router = express.Router();
//const checkAuth = require('../middlewere/check-auth');

//import controller
const KategoriBeritaController = require('../controller/KategoriBeritaController');

//handle incoming request /kategori-berita
router.get('/', KategoriBeritaController.getAll);
router.get('/:kategori_berita_id', KategoriBeritaController.show);
router.post('/', KategoriBeritaController.store);
router.patch('/:kategori_berita_id', KategoriBeritaController.update);
router.delete('/:kategori_berita_id', KategoriBeritaController.delete);

module.exports = router;