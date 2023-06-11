// userService.js
const axios = require('axios');
const { URL_SERVICE_SOSIALISASI } = process.env;

async function getBatchById(id) {
    try {
        const response = await axios.get(`${URL_SERVICE_SOSIALISASI}/batch/${id}/detail`);
        if (!response.data) {
            throw new Error('Batch not found');
        }
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else if (error.response && error.response.status === 404) {
            throw new Error('Batch not found');
        } else {
            throw new Error('User service is not available');
        }
    }
}



module.exports = { getBatchById };

