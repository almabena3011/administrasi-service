const { Sptjm } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const sptjms = await Sptjm.findAll();
        return res.status(200).json({
            status: 'success',
            data: sptjms
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}