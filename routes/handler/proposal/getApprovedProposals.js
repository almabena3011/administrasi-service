const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {

        let proposals;
        if (req.query.srgenerated === 'true') {
            proposals = await Proposal.findAll({
                where: {
                    is_suratrekomendasi_generated: true
                }
            });
        } else {
            proposals = await Proposal.findAll({
                where: {
                    status_approval: "Disetujui"
                }
            });
        }

        res.status(200).json({
            status: 'success',
            data: proposals
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}