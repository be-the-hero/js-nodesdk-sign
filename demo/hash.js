const crypto = require('crypto')

exports.hash256 = (text) => crypto.createHash('sha256').update(text).digest('hex')