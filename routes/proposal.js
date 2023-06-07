var express = require('express');
var router = express.Router();
const uploadMiddleware = require('./multerPdfConfig');
const proposalHandler = require('./handler/proposal');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, uploadMiddleware, proposalHandler.createProposal);
router.post('/:proposalId/assigndosenpenilai', proposalHandler.assignDosenPenilai);
router.get('/:batchId/proposals', proposalHandler.getProposalsByBatchId);
router.get('/', proposalHandler.getAllProposal);
router.put('/:id/approve', proposalHandler.approveProposal);
router.put('/:id/reject', proposalHandler.rejectProposal);
router.put('/:id/generate-surat-rekomendasi', proposalHandler.generateSuratRekomendasi);
router.get('/:id/detail', proposalHandler.getProposal);
router.get('/:id/download', proposalHandler.downloadProposal);
router.get('/:id/unduh-surat-rekomendasi', proposalHandler.unduhSuratRekomendasi);
router.get('/approved-proposals', proposalHandler.getApprovedProposals);
router.get('/:proposalId/penilai', proposalHandler.getPenilai);


module.exports = router;
