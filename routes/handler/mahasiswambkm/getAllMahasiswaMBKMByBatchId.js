const { MahasiswaLulus } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const mahasiswambkms = await MahasiswaLulus.findAll({
            where: {
                batchId: batchId
            }
        });
        return res.status(200).json({
            status: 'success',
            data: mahasiswambkms
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}