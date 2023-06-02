var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerConfig');
const proposalHandler = require('./handler/proposal');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, uploadMiddleware, proposalHandler.createProposal);
router.get('/:batchId/proposals', proposalHandler.getProposalsByBatchId);
router.get('/', proposalHandler.getAllProposal);
router.put('/:id/approve', proposalHandler.approveProposal);
router.put('/:id/reject', proposalHandler.rejectProposal);
router.get('/:id/detail', proposalHandler.getProposal);
router.get('/:id/download', proposalHandler.downloadProposal);
router.get('/approved-proposals', proposalHandler.getApprovedProposals);


module.exports = router;
