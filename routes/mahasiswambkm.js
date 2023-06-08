var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerPdfConfig');
const verifyToken = require('../middleware/verifyToken');
const mahasiswaMbkmHandler = require('./handler/mahasiswambkm');


router.post('/', verifyToken, uploadMiddleware, mahasiswaMbkmHandler.inputKelulusanMitra);



module.exports = router;
