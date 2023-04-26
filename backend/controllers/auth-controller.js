const generateUserSecret = require('../utils/generate-user-secret');
const sendResponse = require('../utils/send-response')
const generateTOTP = require('../../services/totp/generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user-model')

const SALT_ROUNDS = 10;
const JWT_EXPIRiATION_TIME = '5d'
const TEMP_JWT_EXPIRiATION_TIME = '3m'

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !await bcrypt.compare(password, user?.password)) {
        return res.status(400).json(sendResponse(false, 'Invalid credentials'))
    }

    const tempJWT = jwt.sign(
        { userId: user.id },
        process.env.LOGIN_TOKEN_SECRET,
        { expiresIn: TEMP_JWT_EXPIRiATION_TIME }
    );
    
    res.status(200).json(sendResponse(true, 'User logged in', { tempJWT: tempJWT }))
}

const register = async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({ email: email })
    if (user) {
        return res.status(400).json(sendResponse(false, `Account with email '${user?.email}' already exists`))
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(SALT_ROUNDS))

    const secret = generateUserSecret()
    const createdUser = new User({
        email: email,
        password: hashedPassword,
        secret: secret,
    })

    await createdUser.save()

    res.status(200).json(sendResponse(true, `Created new account`, { userSecret: secret }))
}

const verifyTOTP = async (req, res) => {
    const { TOTP } = req.body;

    const user = await User.findById(req.userId);
    const sharedSecret = user.secret;

    const serverTOTP = generateTOTP(sharedSecret);

    if (TOTP === serverTOTP) {
        const JWT = jwt.sign(
            { userId: user.id },
            process.env.LOGIN_TOKEN_SECRET,
            { expiresIn: JWT_EXPIRiATION_TIME }
        );

        res.status(200).json(sendResponse(true, 'TOTP verification successful', { JWT: JWT }));
    } else {
        res.status(400).json(sendResponse(false, 'Invalid TOTP token'));
    }
}

module.exports = {
    login,
    register,
    verifyTOTP,
}