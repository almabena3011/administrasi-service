const { Proposal } = require('../../../models');
const { getMahasiswaById } = require('../userService');

module.exports = async (req, res) => {
    try {
        const mahasiswaId = req.params.mahasiswaId;
        const mahasiswa = await getMahasiswaById(mahasiswaId);
        const proposals = await Proposal.findAll({
            where: {
                mahasiswaId: mahasiswaId,
            }
        });
        return res.status(200).json({
            status: 'success',
            data: proposals
        });
    } catch (error) {
        if (error.message === 'Mahasiswa not found') {
            res.status(404).json({
                error: 'Mahasiswa not found'
            });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: 'ERROR OI' });
        }
    }
}