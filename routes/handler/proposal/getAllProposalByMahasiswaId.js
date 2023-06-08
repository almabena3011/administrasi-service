const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const mahasiswaId = req.params.mahasiswaId;
        const proposals = await Proposal.findAll({
            where: {
                mahasiswaId: mahasiswaId,
                is_suratrekomendasi_generated: true
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