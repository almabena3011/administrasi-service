const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const proposal = await Proposal.findByPk(id);
        res.status(200).json({
            status: 'success',
            data: proposal
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}