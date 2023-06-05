const { BatchDocument } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const documents = await BatchDocument.findAll({
            where: {
                batchId: batchId
            }
        });
        res.status(200).json({
            status: 'success',
            data: documents
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}