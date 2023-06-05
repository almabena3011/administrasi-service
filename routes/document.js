var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerDocumentConfig');
const documentHandler = require('./handler/document');


router.post('/', uploadMiddleware, documentHandler.uploadDocument);
router.get('/:batchId/documents', documentHandler.getDocumentsByBatchId);
router.get('/:id/download', documentHandler.downloadDocument);

module.exports = router;
