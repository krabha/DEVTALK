const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function normally have a callback called
// cb or next alomg with req and res
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied!'
        });
    }

    try {
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));

        req.user = decodedToken.user;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid!'
        });
    }
}