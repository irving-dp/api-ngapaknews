const express   = require('express');
const router    = express.Router();

//import controller
const EventKategoriController = require('../controller/EventKategoricontroller');

//handle incoming request /event-kategori
router.get('/', EventKategoriController.getData);
router.get('/:id', EventKategoriController.getDataById);
router.post('/', EventKategoriController.store);
router.patch('/:id',EventKategoriController.update);
router.delete('/:id', EventKategoriController.delete);

module.exports = router;