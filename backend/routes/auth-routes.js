const router = require('express').Router()
const auth = require('../controllers/auth-controller')
const rateLimit = require("express-rate-limit")
const verifyToken = require('../middleware/verify-token');

const LOGIN_WINDOW_MS = 5 * 60 * 1000;
const LOGIN_REQUESTS_LIMIT = 10;
const TOTP_WINDOW_MS = 3 * 60 * 1000;
const TOTP_REQUESTS_LIMIT = 10;

router.post('/register', auth.register)
router.post('/login',
    rateLimit({
        windowMs: LOGIN_WINDOW_MS,
        max: LOGIN_REQUESTS_LIMIT,
    }),
    auth.login
)
router.post('/verify-totp',
    verifyToken,
    rateLimit({
        windowMs: TOTP_WINDOW_MS,
        max: TOTP_REQUESTS_LIMIT,
    }),
    auth.verifyTOTP
)

module.exports = router