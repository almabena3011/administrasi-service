const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.proposalId;
        const { jlh_penilai } = req.body;
        const proposal = await Proposal.findByPk(id);
        if (!proposal) {
            res.status(404).json({
                status: 'erorr',
                message: 'Proposal not found'
            });
        }

        proposal.jlh_penilai = jlh_penilai;
        await proposal.save();

        return res.status(200).json({
            status: 'success',
            data: proposal,
            message: 'Jumlah penilai berhasil dimasukkan'
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}