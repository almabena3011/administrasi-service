const { Proposal } = require('../../../models');
const Validator = require('fastest-validator');
const { getMahasiswaByAuthId } = require('../userService');

const schema = {
    jenis_program: { empty: false, type: "enum", values: ["Studi Independen", "Magang"] },
    // batchId: { empty: false, type: "number", integer: true },
    nik: { empty: false, type: "string", min: 5, max: 20 },
    ipk: { empty: false, type: "number", positive: true, min: 0, max: 4.00, fixed: 2 },
    jlh_sks: { empty: false, type: "number", integer: true, min: 1 },
    semester: { empty: false, type: "number", integer: true, min: 1, max: 8 }
};

const validate = new Validator().compile(schema);

module.exports = async (req, res) => {
    req.body.ipk = parseFloat(req.body.ipk);
    req.body.jlh_sks = parseInt(req.body.jlh_sks);
    req.body.semester = parseInt(req.body.semester);
    const validationResult = validate(req.body);

    if (Array.isArray(validationResult)) {
        return res.status(400).json({ errors: validationResult });
    }

    const { jenis_program, batchId, nik, ipk, jlh_sks, semester } = req.body;
    const filepath = req.file.path;
    const userId = req.user.data.user.id;


    try {
        const mahasiswa = await getMahasiswaByAuthId(userId);
        console.log(mahasiswa);
        const proposal = await Proposal.create({
            mahasiswaId: mahasiswa.id,
            batchId: batchId,
            nama_mahasiswa: mahasiswa.nama,
            nim: mahasiswa.nim,
            nik: nik,
            ipk: ipk,
            sks_total: jlh_sks,
            current_semester: semester,
            prodi: mahasiswa.Prodi.nama_prodi,
            angkatan: mahasiswa.angkatan,
            jenis_program: jenis_program,
            proposal_path: filepath,
        });

        res.status(201).json({
            status: 'success',
            data: proposal
        });
    } catch (error) {
        console.log(error.message);
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