const crypto = require('crypto')

exports.encrypt = (text, key) => {
  if (!text) {
    return '';
  }
  if (typeof text != 'string') {
      text = JSON.stringify(text);
  }

  const cipherKey = Buffer.from(key, 'hex');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', cipherKey, iv);

  return Buffer.concat([iv, cipher.update(text), cipher.final(), cipher.getAuthTag()]);
}

exports.decrypt = (input, key) => {
  const cipherKey = Buffer.from(key, 'hex');
  const tag = input.slice(input.length - 16, input.length);
  const iv = input.slice(0, 12);
  const toDecrypt = input.slice(12, input.length - tag.length);

  const decipher = crypto.createDecipheriv('aes-256-gcm', cipherKey, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(toDecrypt), decipher.final()]);
}