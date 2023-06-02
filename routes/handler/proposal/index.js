const createProposal = require('./createProposal');
const getProposal = require('./getProposal');
const getAllProposal = require('./getAllProposal');
const getApprovedProposals = require('./getApprovedProposals');
const getProposalsByBatchId = require('./getProposalsByBatchId');
const approveProposal = require('./approveProposal');
const rejectProposal = require('./rejectProposal');

module.exports = {
    createProposal,
    getProposal,
    getAllProposal,
    getApprovedProposals,
    getProposalsByBatchId,
    approveProposal,
    rejectProposal
}