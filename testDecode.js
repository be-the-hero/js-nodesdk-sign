const crypto = require('crypto')

const KEY = '499c3912262b676bee5030c673f3c7c907b37bb74ae0c52dba29bddbebcfdc04';

function Encrypt(text, key) {
  if (!text) {
      return '';
  }
  if (typeof text != 'string') {
      text = JSON.stringify(text);
  }

  const cipherKey = Buffer.from(key, 'hex');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', cipherKey, iv);

  const res = Buffer.concat([iv, cipher.update(text), cipher.final(), cipher.getAuthTag()]);
  return res;    
}

function Decrypt(input, key) {
  const cipherKey = Buffer.from(key, 'hex');
  const tag = input.slice(input.length - 16, input.length);
  const iv = input.slice(0, 12);
  const toDecrypt = input.slice(12, input.length - tag.length);

  const decipher = crypto.createDecipheriv('aes-256-gcm', cipherKey, iv);
  decipher.setAuthTag(tag);

  const res = Buffer.concat([decipher.update(toDecrypt), decipher.final()]);
  return res.toString('utf8');
}

const bufferToReadableDecString = (buffer) => {
  const ret = buffer.toString('hex').match(/[a-z0-9][a-z0-9]/g).map((item) => parseInt(item, 16));
  console.log('10进制：[', ret.join(','), ']');
}

// const input = Buffer.from('ab');
const input = 'ab';
const encrypted = Encrypt(input, KEY);
console.log(`encrypted:`, encrypted)
bufferToReadableDecString(encrypted)
const decrypted = Decrypt(encrypted, KEY);
console.log(`decrypted:`, decrypted)