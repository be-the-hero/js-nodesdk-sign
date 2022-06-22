const crypto = require('crypto')

const hash = crypto.createHash('sha256').update('ABCD').digest('hex');

console.log({ hash });