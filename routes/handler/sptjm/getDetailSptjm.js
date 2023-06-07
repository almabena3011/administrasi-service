const { Sptjm } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const sptjm = await Sptjm.findByPk(id);
        if (!sptjm) {
            return res.status(404).json({
                status: 'error',
                message: 'SPTJM not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            data: sptjm
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}