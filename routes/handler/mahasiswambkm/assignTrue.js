const { MahasiswaLulus } = require('../../../models');
module.exports = async (req, res) => {

    try {
        const id = req.params.id;
        const mahasiswambkm = await MahasiswaLulus.findByPk(id);
        mahasiswambkm.is_assigned_to_pembimbing = true;
        await mahasiswambkm.save();
        return res.status(200).json({
            status: 'success',
            data: mahasiswambkm,
            messsage: 'Assign to dosen successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}