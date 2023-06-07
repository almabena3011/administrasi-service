const { Sptjm } = require('../../../models');
const Validator = require('fastest-validator');
const { getMahasiswaByAuthId } = require('../userService');


const schema = {
    nama_lengkap: { empty: false, type: "string", min: 5, max: 50 },
    no_wa: { empty: false, type: "string", min: 5, max: 13 },
    email: { empty: false, type: "string" },
    nik: { empty: false, type: "string" },
    nama_ot_ttd: { empty: false, type: "string", min: 5, max: 50 },
    proposalId: { empty: false, type: "number", positive: true }
};

const validate = new Validator().compile(schema);

module.exports = async (req, res) => {
    const validationResult = validate(req.body);
    if (Array.isArray(validationResult)) {
        return res.status(400).json({ errors: validationResult });
    }
    const { userId, proposalId, nama_lengkap, no_wa, nama_ot_ttd, nik, email } = req.body;
    try {
        const mahasiswa = await getMahasiswaByAuthId(userId);
        console.log(mahasiswa);
        const sptjm = await Sptjm.create({
            mahasiswaId: mahasiswa.id,
            proposalId: proposalId,
            nama_lengkap: nama_lengkap,
            prodi: mahasiswa.prodi,
            nim: mahasiswa.nim,
            nik: nik,
            no_wa: no_wa,
            email: email,
            nama_ot_ttd: nama_ot_ttd,
            prodi: mahasiswa.Prodi.nama_prodi,
        });

        return res.status(201).json({
            status: 'success',
            data: sptjm
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