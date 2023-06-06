var express = require('express');
var router = express.Router();
const penilaiHandler = require('./handler/penilai');


router.put('/:id/nilai', penilaiHandler.giveNilai);


module.exports = router;
