const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const proposal = await Proposal.findByPk(id);
        if (!proposal) {
            res.status(404).json({
                status: 'erorr',
                message: 'Proposal not found'
            });
        }

        proposal.status_approval = 'Ditolak';
        await proposal.save();

        res.status(200).json({
            status: 'success',
            data: proposal,
            message: 'Proposal berhasil disetujui'
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}