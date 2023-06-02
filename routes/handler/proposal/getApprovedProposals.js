const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const proposals = await Proposal.findAll({
            where: {
                status_approval: "Disetujui"
            }
        });
        res.status(200).json({
            status: 'success',
            data: proposals
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}