const fs = require('fs');
const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        const proposal = await Proposal.findByPk(id);

        if (!proposal) {
            return res.status(404).json({
                status: 'error',
                message: 'Proposal not found',
            });
        }
        const filePath = proposal.transkrip_path;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                status: 'error',
                message: 'File not found',
            });
        }
        const fileName = proposal.nama_mahasiswa;
        res.download(filePath, fileName, (error) => {
            if (error) {
                res.status(500).json({ error: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
