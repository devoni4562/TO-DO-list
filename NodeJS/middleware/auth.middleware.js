const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error(`token non fourni`);
        }
        const decodedJWT = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedJWT.userId;
        req.auth = {
            userId: userId
        };
        console.log(req.auth);
        next();
    } catch (err) {
        res.status(401).json({err});
        console.log(err);
    }
};