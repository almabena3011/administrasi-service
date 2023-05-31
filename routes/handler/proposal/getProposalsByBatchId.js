const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const proposals = Proposal.findAll({
            where: {
                batchId: batchId
            }
        })
        res.status(200).json({
            status: 'success',
            data: proposals
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}