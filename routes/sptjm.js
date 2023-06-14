var express = require('express');
var router = express.Router();

const sptjmHandler = require('./handler/sptjm');

router.put('/:id/generate-sptjm', sptjmHandler.generateSptjm);
router.get('/:id/download-sptjm', sptjmHandler.downloadSptjm);

module.exports = router;
