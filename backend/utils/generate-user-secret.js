const crypto = require('crypto')
const base32 = require('thirty-two')
const { v4: uuid } = require('uuid')

const generateUserSecret = () => {
    const token = uuid()
    const buffer = Buffer.from(token, 'utf8')
    const base32Token = base32.encode(buffer).toString();

    return base32Token
}

module.exports = generateUserSecret