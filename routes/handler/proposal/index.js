const createProposal = require('./createProposal');
const getProposal = require('./getProposal');
const getAllProposal = require('./getAllProposal');
const getApprovedProposals = require('./getApprovedProposals');
const getProposalsByBatchId = require('./getProposalsByBatchId');
const approveProposal = require('./approveProposal');
const rejectProposal = require('./rejectProposal');
const downloadProposal = require('./downloadProposal');
const assignJumlahPenilai = require('./assignJumlahPenilai');
const assignDosenPenilai = require('./assignDosenPenilai');
const getPenilai = require('./getPenilai');

module.exports = {
    createProposal,
    getProposal,
    getAllProposal,
    getApprovedProposals,
    getProposalsByBatchId,
    approveProposal,
    rejectProposal,
    downloadProposal,
    assignJumlahPenilai,
    assignDosenPenilai,
    getPenilai
}