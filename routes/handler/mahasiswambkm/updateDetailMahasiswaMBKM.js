const { MahasiswaLulus } = require('../../../models');
const Validator = require('fastest-validator');
const fs = require('fs');


const schema = {
    nama_kegiatan: { empty: false, type: "string", min: 5, max: 100 },
    jenis_mbkm: { empty: false, type: "enum", values: ["Studi Independen", "Magang"] },
    mitra: { empty: false, type: "string", min: 5, max: 100 },
    tempat_pelaksanaan: { empty: false, type: "string", min: 5, max: 100 },
    tanggal_mulai: { type: "date", convert: true },
    tanggal_berakhir: { type: "date", convert: true },
};

const validate = new Validator().compile(schema);

module.exports = async (req, res) => {
    const validationResult = validate(req.body);
    if (Array.isArray(validationResult)) {
        return res.status(400).json({ errors: validationResult });
    }
    let path = '';
    const { nama_kegiatan, jenis_mbkm, mitra, tempat_pelaksanaan, tanggal_mulai, tanggal_berakhir, oldfilepath } = req.body;
    console.log(oldfilepath);
    if (req.file) {
        fs.unlink(oldfilepath, (err) => {
            if (err) {
                console.error('An error occurred while deleting the old file:', err);
            } else {
                console.log('Old file deleted successfully');
            }
        });
        path = req.file.path;
    } else {
        path = oldfilepath;
    }


    try {
        const id = req.params.id;
        const mahasiswambkm = await MahasiswaLulus.findByPk(id);
        mahasiswambkm.nama_kegiatan = nama_kegiatan;
        mahasiswambkm.jenis_mbkm = jenis_mbkm;
        mahasiswambkm.mitra = mitra;
        mahasiswambkm.tempat_pelaksanaan = tempat_pelaksanaan;
        mahasiswambkm.bukti_kelulusan_path = path;
        mahasiswambkm.tanggal_mulai = tanggal_mulai;
        mahasiswambkm.tanggal_berakhir = tanggal_berakhir;
        await mahasiswambkm.save();
        return res.status(200).json({
            status: 'success',
            data: mahasiswambkm,
            messsage: 'Mahasiswa MBKM succesfully updated'
        });
    } catch (error) {
        console.log(error);
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