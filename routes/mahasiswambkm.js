var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerPdfConfig');
const verifyToken = require('../middleware/verifyToken');
const mahasiswaMbkmHandler = require('./handler/mahasiswambkm');


router.post('/', verifyToken, uploadMiddleware, mahasiswaMbkmHandler.inputKelulusanMitra);
router.get('/', mahasiswaMbkmHandler.getAllMahasiswaMBKM);
router.get('/:batchId/allmahasiswa', mahasiswaMbkmHandler.getAllMahasiswaMBKMByBatchId);
router.get('/:id', mahasiswaMbkmHandler.getDetailMahasiswaMBKM);
router.get('/:id/unduh-bukti-kelulusan', mahasiswaMbkmHandler.unduhBukti);
router.put('/:id', verifyToken, uploadMiddleware, mahasiswaMbkmHandler.updateDetailMahasiswaMBKM);


module.exports = router;
