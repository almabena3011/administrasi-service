const { MahasiswaLulus } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const mahasiswambkm = await MahasiswaLulus.findByPk(id);
        if (!mahasiswambkm) {
            return res.status(404).json({
                status: 'error',
                message: 'Mahasiswa MBKM not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            data: mahasiswambkm
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}