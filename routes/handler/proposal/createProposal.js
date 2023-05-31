const { Proposal } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getMahasiswaByAuthId } = require('../userService');

module.exports = async (req, res) => {
    const { jenis_program, batchId } = req.body;
    const filepath = req.file.path;
    const userId = req.user.data.user.id;
    console.log(userId);
    try {
        const mahasiswa = await getMahasiswaByAuthId(userId);
        console.log(mahasiswa);
        const proposal = await Proposal.create({
            mahasiswaId: mahasiswa.id,
            batchId: batchId,
            nama_mahasiswa: mahasiswa.nama,
            nim: mahasiswa.nim,
            angkatan: mahasiswa.angkatan,
            jenis_program: jenis_program,
            proposal_path: filepath,
        });

        res.status(201).json({
            status: 'success',
            data: proposal
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