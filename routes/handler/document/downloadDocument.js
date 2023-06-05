const { BatchDocument } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const document = await BatchDocument.findByPk(id);
        if (!document) {
            return res.status(404).json({
                status: 'erorr',
                message: 'Document not found'
            });
        }
        const file = document.document_path;
        res.download(file);

    } catch (error) {
        console.error(error); // Print error to console for debugging
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            detail: error.message // Include actual error message for better error understanding
        });
    }
}