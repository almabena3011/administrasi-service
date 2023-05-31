const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    //authorization adalah header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Invalid authorization header format"
        });
    }

    //extract the token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).json({
                message: err.message
            });
        }
        //ketika tidak ada error, menggunakan data yang di decoded
        req.user = decoded;
        return next();
    })
}