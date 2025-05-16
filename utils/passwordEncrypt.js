const crypto = require('crypto')

const salt = process.env?.SERCRET_KEY || crypto.randomBytes(16).toString('hex')
const loopCount = 10_000 //10k
const charCount = 32 //32 char
const encType = 'sha512'
module.exports = function (password) {
  return crypto
    .pbkdf2Sync(password, salt, loopCount, charCount, encType)
    .toString('hex')
}
