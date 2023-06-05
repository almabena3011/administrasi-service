// multerConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/documents')); // Ubah ini sesuai struktur direktori Anda
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        cb(null, `${timestamp}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    // Only accept files with the following extensions
    const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".png", ".jpeg", ".jpg", ".zip", ".rar"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
        return cb(new Error(`Only the following file types are allowed: ${allowedTypes.join(", ")}`), false);
    }
    cb(null, true);
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024  // Limit file size to 10MB
    }
}).single('dokumen_administrasi');

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err.message)
            return res.status(500).json(err.message);
        } else if (err) {
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
