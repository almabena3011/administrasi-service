var express = require('express');
var router = express.Router();

const sptjmHandler = require('./handler/sptjm');



router.get('/:mahasiswaId/allrequestedsptjm', sptjmHandler.getAllRequestedSptjmByMahasiswaId);
router.post('/', sptjmHandler.requestSptjm);
router.get('/', sptjmHandler.getAllRequestedSptjm);
router.get('/:id', sptjmHandler.getDetailSptjm);
router.put('/:id/generate-sptjm', sptjmHandler.generateSptjm);
router.get('/:id/download-sptjm', sptjmHandler.downloadSptjm);



module.exports = router;
