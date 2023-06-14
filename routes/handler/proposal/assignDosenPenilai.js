const { PenilaiProposal, Proposal } = require('../../../models');
const { getDosenById } = require('../userService');

module.exports = async (req, res) => {
    const proposalId = req.params.proposalId;
    console.log(proposalId);
    const { dosenId } = req.body;
    console.log(dosenId);
    try {
        const proposal = await Proposal.findByPk(proposalId);
        if (!proposal) {
            return res.status(404).send({
                status: 'error',
                message: 'Proposal not found'
            });
        }
        const dosen = await getDosenById(dosenId);
        console.log('dosen', dosen);
        if (!dosen) {
            return res.status(404).send({
                status: 'error',
                message: 'Dosen not found'
            });
        }
        // const proposal_penilais = await PenilaiProposal.findAll({
        //     where: {
        //         proposalId: proposalId
        //     }
        // });
        // if (proposal_penilais.length === 2) {
        //     return res.status(400).send({
        //         status: 'error',
        //         message: 'Penilai sudah lebih dari 2'
        //     });
        // }
        const proposal_penilai = await PenilaiProposal.findOne({
            where: {
                proposalId: proposalId,
                dosenId: dosenId
            }
        });
        if (proposal_penilai) {
            return res.status(409).send({
                status: 'error',
                message: 'Sudah terdaftar sebagai penilai'
            });
        }
        const newProposalPenilai = await PenilaiProposal.create({
            proposalId: proposalId,
            dosenId: dosenId,
            nama_dosen: dosen.nama
        });
        return res.status(200).send({
            status: 'success',
            data: newProposalPenilai,
            message: 'Penilai berhasil diassign'
        });
    } catch (error) {
        if (error.message === 'Dosen not found') {
            return res.status(404).json({
                error: 'Dosen not found'
            });
        } else if (error.message === 'User service is not available') {
            return res.status(500).json({ error: 'User service is not available' });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}