const sendResponse = require('../utils/send-response')
const totpService = require('../services/totp-service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        return res.status(400).json(sendResponse(false, 'invalid-credentials'))
    }

    const tempJwt = jwt.sign(
        { userId: user.id },
        process.env.LOGIN_TOKEN_SECRET,
        { expiresIn: TEMP_JWT_EXPIRiATION_TIME }
    );

    res.status(200).json(sendResponse(true, 'login-success', { tempJwt: tempJwt }))
}

const register = async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({ email: email })
    if (user) {
        return res.status(400).json(sendResponse(false, 'email-already-in-use'))
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(SALT_ROUNDS))

    const secret = totpService.generateUserSecret()
    const createdUser = new User({
        email: email,
        password: hashedPassword,
        secret: secret,
    })

    await createdUser.save()

    res.status(200).json(sendResponse(true, 'register-success', { userSecret: secret }))
}

const verifyTOTP = async (req, res) => {
    const { totp } = req.body;

    const user = await User.findById(req.userId);
    const sharedSecret = user.secret;

    // const verified = speakeasy.totp.verify({
    //     secret: sharedSecret,
    //     encoding: 'base32',
    //     token: totp
    // });

    const verified = totpService.verifyTotp(totp, sharedSecret);

    if (verified) {
        const userJwt = jwt.sign(
            { userId: user.id },
            process.env.LOGIN_TOKEN_SECRET,
            { expiresIn: JWT_EXPIRiATION_TIME }
        );

        res.status(200).json(sendResponse(true, 'totp-verification-success', { jwt: userJwt }));
    } else {
        res.status(400).json(sendResponse(false, 'totp-verification-fail'));
    }
}

module.exports = {
    login,
    register,
    verifyTOTP,
}