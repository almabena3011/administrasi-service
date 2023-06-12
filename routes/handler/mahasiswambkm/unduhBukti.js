const { MahasiswaLulus } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const mahasiswambkm = await MahasiswaLulus.findByPk(id);
        if (!mahasiswambkm) {
            res.status(404).json({
                status: 'erorr',
                message: 'Mahasiswa Mbkm not found'
            });
        }
        const file = mahasiswambkm.bukti_kelulusan_path;
        const fileExtension = file.split('.').pop();
        const newFileName = `Bukti Kelulusan_${mahasiswambkm.nama_mahasiswa}.${fileExtension}`;
        res.download(file, newFileName);

    } catch (error) {
        console.error(error); // Print error to console for debugging
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            detail: error.message // Include actual error message for better error understanding
        });
    }
}