// multerConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './proposal')); // Ubah ini sesuai struktur direktori Anda
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        cb(null, `${timestamp}${ext}`);
    },
});

const upload = multer({ storage: storage }).single('dokumen_proposal');

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('error: ', err.message);
            return res.status(500).json(err.message);
        } else if (err) {
            console.log(err.message);
            return res.status(500).json(err.message);
        }
        console.log('berhasil melewati middleware');
        next();
    });
};

module.exports = uploadMiddleware;
