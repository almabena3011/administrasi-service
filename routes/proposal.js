var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerConfig');
const proposalHandler = require('./handler/proposal');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, uploadMiddleware, proposalHandler.createProposal);
router.get('/:batchId', proposalHandler.getProposalsByBatchId);
router.get('/', proposalHandler.getAllProposal);
// router.get('/:id', proposalHandler.getProposal);
// router.get('/approved-proposal', proposalHandler.getApprovedProposals);


module.exports = router;
