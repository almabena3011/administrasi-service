var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerDocumentConfig');
const documentHandler = require('./handler/document');


router.post('/', uploadMiddleware, documentHandler.uploadDocument);


module.exports = router;
