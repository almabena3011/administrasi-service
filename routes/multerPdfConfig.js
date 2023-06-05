// multerConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/proposals')); // Ubah ini sesuai struktur direktori Anda
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        cb(null, `${timestamp}${ext}`);
    },
});

const fileFilter = function (req, file, cb) {
    // Accept PDFs only
    if (!file.originalname.match(/\.(pdf)$/)) {
        req.fileValidationError = 'Hanya file PDF yang diperbolehkan!';
        return cb(new Error('Hanya file PDF yang diperbolehkan!'), false);
    }
    cb(null, true);
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // Limit file size to 2MB
    }
}).single('dokumen_proposal');

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                err.message = 'Ukuran file terlalu besar! Maksimum adalah 2MB';
                console.log(err.message);
                return res.status(400).json(err.message);
            }
            console.log('error: ', err.message);
            return res.status(500).json(err.message);
        } else if (err) {
            if (req.fileValidationError) {
                console.log(req.fileValidationError);
                return res.status(400).json(req.fileValidationError);
            }
            console.log(err.message);
            return res.status(500).json(err.message);
        }

        // Check if no file was received
        if (!req.file) {
            console.log("No file received");
            return res.status(400).json("Tidak ada file yang diterima");
        }
        console.log('berhasil melewati middleware');
        next();
    });
};

module.exports = uploadMiddleware;
