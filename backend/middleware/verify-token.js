const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/send-response');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization || req.headers.Authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
        return res.status(400).json(sendResponse(false, 'access-denied'));
    }

    jwt.verify(
        authorizationHeader.split(' ')[1],
        process.env.LOGIN_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(400).json(sendResponse(false, err.message));
            }
            req.userId = decoded?.userId;
            next();
        }
    )
}

module.exports = verifyToken;