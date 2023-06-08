var express = require('express');
var router = express.Router();

const transkripNilaiHandler = require('./handler/transkrip-nilai');


router.post('/', transkripNilaiHandler.requestTranskripNilai);
// router.get('/:mahasiswaId/allrequestedtranskripNilai', transkripNilaiHandler.getAllRequestedTranskripNilaiByMahasiswaId);
// router.get('/', transkripNilaiHandler.getAllRequestedTranskripNilai);
// router.put('/:id/kirim-transkrip', transkripNilaiHandler.generatetranskripNilai);
// router.get('/:id/download-transkripNilai', transkripNilaiHandler.downloadtranskripNilai);



module.exports = router;
