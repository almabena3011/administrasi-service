const { MahasiswaLulus } = require('../../../models');
const Validator = require('fastest-validator');
const { getMahasiswaByAuthId } = require('../userService');

const schema = {
    batchId: { empty: false, type: "number", integer: true },
    nama_kegiatan: { empty: false, type: "string", min: 5, max: 100 },
    jenis_mbkm: { empty: false, type: "enum", values: ["Studi Independen", "Magang"] },
    mitra: { empty: false, type: "string", min: 5, max: 100 },
    tempat_pelaksanaan: { empty: false, type: "string", min: 5, max: 100 },
    tanggal_mulai: { type: "date", convert: true },
    tanggal_berakhir: { type: "date", convert: true },
};

const validate = new Validator().compile(schema);

module.exports = async (req, res) => {
    req.body.batchId = parseInt(req.body.batchId);

    const validationResult = validate(req.body);
    if (Array.isArray(validationResult)) {
        return res.status(400).json({ errors: validationResult });
    }


    const { batchId, nama_kegiatan, jenis_mbkm, mitra, tempat_pelaksanaan, tanggal_mulai, tanggal_berakhir } = req.body;
    const filepath = req.file.path;
    const userId = req.user.data.user.id;

    console.log("Formatted tanggal_mulai:", tanggal_mulai);
    console.log("Formatted tanggal_berakhir:", tanggal_berakhir);


    try {
        const mahasiswa = await getMahasiswaByAuthId(userId);
        console.log(mahasiswa);
        const mahasiswambkm = await MahasiswaLulus.create({
            mahasiswaId: mahasiswa.id,
            batchId: batchId,
            nama_kegiatan: nama_kegiatan,
            jenis_mbkm: jenis_mbkm,
            mitra: mitra,
            tempat_pelaksanaan: tempat_pelaksanaan,
            bukti_kelulusan_path: filepath,
            tanggal_mulai: tanggal_mulai,
            tanggal_berakhir: tanggal_berakhir
        });

        return res.status(201).json({
            status: 'success',
            data: mahasiswambkm
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