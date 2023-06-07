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
        const file = proposal.surat_rekomendasi_path;
        const fileExtension = file.split('.').pop();
        const newFileName = `SuratRekomendasi_${proposal.nama_mahasiswa}.${fileExtension}`;
        res.download(file, newFileName);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            detail: error.message
        });
    }
}