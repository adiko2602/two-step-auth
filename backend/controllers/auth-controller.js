const sendResponse = require('../utils/send-response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const SALT_ROUNDS = 10;

const login = async (req, res) => {
    const {
        email, 
        password
    } = req.body

    const user = await User.findOne({ email: email })
    
    if (!user || !await bcrypt.compare(password, user?.password)) {
        return res.status(400).json(sendResponse(false, 'Invalid credentials'))
    }

    const loginToken = jwt.sign(
        { 'email': user.email },
        process.env.LOGIN_TOKEN_SECRET, 
        { expiresIn: 5 * 60 }
    );

    res.status(200).json(sendResponse(true, 'User logged in', loginToken))
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

    const createdUser = new User({
        email: email,
        password: hashedPassword,
    })

    await createdUser.save();
    
    res.status(200).json(sendResponse(true, `Created new account`))
}

module.exports = {
    login,
    register,
}