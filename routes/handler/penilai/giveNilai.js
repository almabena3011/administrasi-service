const { Proposal, PenilaiProposal } = require('../../../models');

async function updateAverageSkor(proposalId) {
    // find all PenilaiProposal for a specific proposal
    const penilaiProposals = await PenilaiProposal.findAll({ where: { proposalId } });

    // if one of the PenilaiProposal has not input their score, return null
    for (let i = 0; i < penilaiProposals.length; i++) {
        if (!penilaiProposals[i].is_input_score || penilaiProposals[i].nilai === null) {
            return null;
        }
    }

    // calculate the average score
    let totalScore = 0;
    for (let i = 0; i < penilaiProposals.length; i++) {
        totalScore += penilaiProposals[i].nilai;
    }
    const averageSkor = totalScore / penilaiProposals.length;

    // update the proposal with the calculated average score
    const proposal = await Proposal.findOne({ where: { id: proposalId } });
    proposal.averageSkor = averageSkor;
    proposal.status_approval = averageSkor >= 80 ? 'Disetujui' : 'Ditolak';
    await proposal.save();

    return averageSkor;
}

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id: ", id);
        const { nilai } = req.body;

        // find the PenilaiProposal
        const penilaiProposal = await PenilaiProposal.findOne({ where: { id } });

        if (!penilaiProposal) {
            return res.status(404).json({ error: 'PenilaiProposal not found' });
        }

        // update the score and is_input_score flag
        penilaiProposal.nilai = nilai;
        penilaiProposal.is_input_score = true;
        await penilaiProposal.save();

        // update averageSkor and status of the proposal
        const averageSkor = await updateAverageSkor(penilaiProposal.proposalId);
        const proposal = await Proposal.findOne({ where: { id: penilaiProposal.proposalId } });

        res.json({ message: 'Nilai updated successfully', averageSkor, status: proposal.status });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}