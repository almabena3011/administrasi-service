const { MahasiswaLulus } = require('../../../models');

module.exports = async (req, res) => {
    try {

        let filter = {};
        if (req.query.is_assign === 'true') {
            filter.is_assigned_to_pembimbing = true;
        }

        const mahasiswambkms = await MahasiswaLulus.findAll({
            where: filter
        });

        return res.status(200).json({
            status: 'success',
            data: mahasiswambkms
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}