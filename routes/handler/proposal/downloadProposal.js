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
        const file = proposal.proposal_path;
        // Mendapatkan ekstensi file
        const fileExtension = file.split('.').pop();
        // Mengatur nama file baru
        const newFileName = `Proposal_${proposal.nama_mahasiswa}.${fileExtension}`;
        res.download(file, newFileName); // Mengirim file sebagai response dengan nama file yang disesuaikan


    } catch (error) {
        console.error(error); // Print error to console for debugging
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            detail: error.message // Include actual error message for better error understanding
        });
    }
}