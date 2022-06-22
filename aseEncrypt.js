const CryptoJS = require('crypto-js');

const cipherKeyJex = '499c3912262b676bee5030c673f3c7c907b37bb74ae0c52dba29bddbebcfdc04';
const cipherKeyBuffer = Buffer.from(cipherKeyJex, 'hex');
const dataHex = '0a 24 74 79 70 65 2e 67 6f 6f 67 6c 65 61 70 69 73 2e 63 6f 6d 2f 71 75 6f 72 75 6d 2e 70 62 2e 4f 62 6a 65 63 74 12 2c 12 04 4e 6f 74 65 32 11 73 69 6d 70 6c 65 20 6e 6f 74 65 20 62 79 20 61 61 42 11 41 20 73 69 6d 70 6c 65 20 4e 6f 64 65 20 69 64 31'.replaceAll(' ', '')
const dataBuffer = Buffer.from(dataHex, 'hex');
 
 const key = '499c3912262b676bee5030c673f3c7c907b37bb74ae0c52dba29bddbebcfdc04';
// Encrypt
var encryptedData = CryptoJS.AES.encrypt('1', key).toString();
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(encryptedData, key);
var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

const buffer = Buffer.from(encryptedData);

const bufferToReadableDecString = (buffer) => {
  const ret = buffer.toString('hex').match(/[a-z0-9][a-z0-9]/g).map((item) => parseInt(item, 16));
  console.log('10进制：[', ret.join(','), ']');
}

console.log({ bufferDec: bufferToReadableDecString(buffer), encryptedData, decryptedData });
