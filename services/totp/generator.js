const totp = require("totp-generator");

const generateTOTP = (token) => {
    return totp("token", {
        digits: 6,
        algorithm: "SHA-1",
        period: 90,
    });
}

module.exports = generateTOTP;