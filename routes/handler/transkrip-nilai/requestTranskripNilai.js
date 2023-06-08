const { TranskripNilai } = require('../../../models');
const { getMahasiswaByAuthId } = require('../userService');

module.exports = async (req, res) => {

    const { userId } = req.body;
    console.log(userId);
    try {
        const mahasiswa = await getMahasiswaByAuthId(userId);
        console.log(mahasiswa);
        const transkrip_nilai = await TranskripNilai.create({
            mahasiswaId: mahasiswa.id,
            nama_mahasiswa: mahasiswa.nama_mahasiswa,
            prodi: mahasiswa.Prodi.nama_prodi,
            angkatan: mahasiswa.angkatan,
            nim: mahasiswa.nim,
        });

        return res.status(201).json({
            status: 'success',
            data: transkrip_nilai
        });
    } catch (error) {
        if (error.message === 'Mahasiswa not found') {
            res.status(404).json({
                error: 'Mahasiswa not found'
            });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}