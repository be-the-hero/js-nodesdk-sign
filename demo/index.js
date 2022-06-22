const protobuf = require('./protobuf');
const aseEncryption = require('./aseEncryption');
const hash = require('./hash');

const ASE_ENCRYPTION_KEY = '499c3912262b676bee5030c673f3c7c907b37bb74ae0c52dba29bddbebcfdc04';

const main = async () => {
  try {
    // 初始化 object
    const object = {
      type: "Note",
      content: "js demo",
      name: "raimonfuns" 
    }

    // 计算 object protobuf
    const objectProtoBuffer = await protobuf.create({
      protoFileName: 'quorum.proto',
      type: 'quorum._Object',
      payload: object
    })

    // 加密 object protobuf
    const input = objectProtoBuffer.toString();
    const encryptedData = aseEncryption.encrypt(input, ASE_ENCRYPTION_KEY);
    console.log({ encryptedData: encryptedData.toString('hex') });

    // const decryptedData = aseEncryption.decrypt(encryptedData, ASE_ENCRYPTION_KEY);
    // console.log({ decryptedData: decryptedData.toString() });

    // 拼接 trx
    

    // 计算 trx protobuf

    // hash trx protobuf
  } catch (err) {
    console.log(err);
  }
}

main();
