const { PenilaiProposal } = require('../../../models');

module.exports = async (req, res) => {
    const proposalId = req.params.proposalId;
    try {
        const penilai = await PenilaiProposal.findAll({
            where: {
                proposalId: proposalId
            }
        });
        res.status(200).json({
            status: 'success',
            data: penilai
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}