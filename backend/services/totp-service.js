const speakeasy = require('speakeasy');

const verifyTotp = (totp, sharedSecret) => {
    return speakeasy.totp.verify({
        secret: sharedSecret,
        encoding: 'base32',
        token: totp
    })
}

const generateUserSecret = () => {
    const secret = speakeasy.generateSecret()
    
    return secret
}

module.exports = {verifyTotp, generateUserSecret};