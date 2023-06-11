const { Proposal } = require('../../../models');
const { getBatchById } = require('../sosialisasiService');
module.exports = async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const batch = await getBatchById(batchId);
        const proposals = await Proposal.findAll({
            where: {
                batchId: batchId
            }
        });
        return res.status(200).json({
            status: 'success',
            data: proposals
        });
    } catch (error) {
        if (error.message === 'Batch not found') {
            res.status(404).json({
                error: 'Batch not found'
            });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}