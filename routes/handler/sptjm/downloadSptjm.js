const { Sptjm } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const sptjm = await Sptjm.findByPk(id);
        if (!sptjm) {
            res.status(404).json({
                status: 'erorr',
                message: 'SPTJM not found'
            });
        }
        const file = sptjm.sptjm_path;
        const fileExtension = file.split('.').pop();
        const newFileName = `SPTJM_${sptjm.nama_lengkap}.${fileExtension}`;
        res.download(file, newFileName);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            detail: error.message
        });
    }
}