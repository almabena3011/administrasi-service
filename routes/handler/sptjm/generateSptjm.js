const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const proposal = await Proposal.findByPk(id);
        if (!proposal) {
            return res.status(404).json({
                status: 'error',
                message: 'Proposal not found'
            });
        }
        proposal.is_sptjm_generated = true;
        await proposal.save();

        return res.status(200).json({
            status: 'success',
            data: proposal,
            message: 'SPTJM berhasil diterbitkan'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
