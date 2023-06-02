const { Proposal } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const proposal = await Proposal.findByPk(id);
        if (!proposal) {
            res.status(404).json({
                status: 'erorr',
                message: 'Proposal not found'
            });
        }
        const file = proposal.proposal_path;
        res.download(file); // Mengirim file sebagai response

    } catch (error) {
        console.error(error); // Print error to console for debugging
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            detail: error.message // Include actual error message for better error understanding
        });
    }
}