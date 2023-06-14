var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const uploadMiddleware = require('./multerPdfConfig');
const transkripNilaiHandler = require('./handler/transkrip-nilai');


router.put('/:id', verifyToken, uploadMiddleware, transkripNilaiHandler.requestTranskripNilai);
router.get('/:id/unduh-transkrip', transkripNilaiHandler.unduhTranskripNilai);




module.exports = router;
