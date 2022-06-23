const protobuf = require('./protobuf');
const aseEncryption = require('./aseEncryption');
const hash = require('./hash');
const UUID = require('uuid');
const request = require('request-promise');

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
    // console.log({ encryptedData: encryptedData.toString('hex') });

    // const decryptedData = aseEncryption.decrypt(encryptedData, ASE_ENCRYPTION_KEY);
    // console.log({ decryptedData: decryptedData.toString() });

    // 拼接 trx
    // const TimeStamp = new Date();
    // const Expired = TimeStamp.setSeconds(TimeStamp.getSeconds() + 30)
    // const trx = {
    //   TrxId: UUID.v4(),
    //   Type: 'POST',
    //   GroupId: 'ef932ffa-87cb-4bea-bbb0-28c93ce062f7',
    //   Data: '',
    //   TimeStamp: TimeStamp * 1000000,
    //   Version: '1.0.0',
    //   Expired: Expired * 1000000,
    //   ResendCount: 0,
    //   Nonce: 1,
    //   SenderPubkey: 'CAISIQKOZ5PtsX7kB/qSWTGsTIuK7fT58zISX4vxhBnMDacu/w==',
    //   SenderSign: '',
    //   StorageType: 'CHAIN',
    // }

    const trx = {
      TrxId: '8abc08ee-6793-4c2c-881a-7e513d729cce',
      GroupId: 'ef932ffa-87cb-4bea-bbb0-28c93ce062f7',
      Data: Buffer.from('0a24747970652e676f6f676c65617069732e636f6d2f71756f72756d2e70622e4f626a656374121b12044e6f746532076a732064656d6f420a7261696d6f6e66756e73', 'hex'),
      TimeStamp: 1655960803384000000,
      Version: '1.0.0',
      Expired: 1655960833384000000,
      Nonce: 135,
      SenderPubkey: 'CAISIQKOZ5PtsX7kB/qSWTGsTIuK7fT58zISX4vxhBnMDacu/w==',
      SenderSign: Buffer.from('0a24747970652e676f6f676c65617069732e636f6d2f71756f72756d2e70622e4f626a656374121b12044e6f746532076a732064656d6f420a7261696d6f6e66756e73', 'hex'),
    }

    // const trxString = JSON.stringify(trx);
    // console.log({ trxString });
    // const hashRet = hash.hash256(trxString);
    // console.log({ hashRet });

    // console.log({ trx });

    // 计算 trx protobuf
    const trxProtoBuffer = await protobuf.create({
      protoFileName: 'quorum.proto',
      type: 'quorum.Trx',
      payload: trx
    })
    console.log({ trxProtoBufferHex: trxProtoBuffer.toString('hex') });
    console.log({ trxProtoBufferToString: trxProtoBuffer.toString() });
    const base64String = trxProtoBuffer.toString('base64');
    console.log({ base64String });

    // get trx json string
    const trxJsonString = JSON.stringify({
      TrxBytes: trxProtoBuffer.toString('base64'),
      JwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    })
    console.log({ trxJsonString });

    // encrypt trx json string
    const encryptedTrxJsonStringBuffer = aseEncryption.encrypt(trxJsonString, ASE_ENCRYPTION_KEY);
    bufferToReadableHexString(encryptedTrxJsonStringBuffer);

    // get send trx json string
    const sendTrxJsonString = JSON.stringify({
      TrxItem: encryptedTrxJsonStringBuffer.toString('base64')
    });
    console.log({ sendTrxJsonString });


    console.log(Buffer.from(`{"TrxItem":"O9Rjfhn3ZbgBqDiRiXUrwo4YjyqgppGG39QDh2oQtffMzeNfRcuEqDSTBnxBJie36QQwbcHvVPA4hL6AoIq2CZEorMXw8MWhRS6+Cba3JGi9XHNC5bEqWIQrMh/hjygO9I1jvTU+gxdhGs30EIxFRZP82MO3C0HTrm409SSw9P58k27JrKI9Sz/URVQOCJC/tHmb1cAINSrO7Jplu+LijdxCpalTAyBW4/JfypziD3PfH/K7+SjWP3mVkERjwT3OeNpsscntD1YW1hFXv2uhZsmorV/dicTyFpLSv7UysbdPnnynDQcBgtWEW47/mVL25N50SGD0nDqReaC7J/wDJx28iRYLyyGnHsvdNqeprI6GPUvKZRB+KDMrHrvXDULIPGTtMGJb7rere4ONrn1OW91zDZI++qmpsWMexfUHB1T7w/guTpsv0nj9tk3JlomxrISGunBGsCHAexYdJbbnNi5MtG5WcM5/9RdAoZh54JRbXVRyxCP2he1KEigJ3bvbVTRZ0ZgQtJylLYOM4deZ+pxubYzNxicu5l/VAHT/fGbzUSmt8TaxdCf0euHW2OYoMPawAteClmu9hThR4clKiu+CgSTUmG8eOUXZ0uTx+/nDgYdjzi9sT45fQY79fmXuJr3g3A6hgvo2nqOnZWw+FzMd1LNxBaEN8JOO2dzluTi24RuFmAnsM4qIoilftcHW9oDVj3ENvh+tve53ikoBCKiejIr0r3xgrtc867fwNJjSVf9wQH/LLShjCGV3x6b+Gzn9iUSyEs3mfFFNLHn0VAqCaT6MH9zoXoEky/VkoJ12rNrN2opMPwD5KEY2rqQMYSXfbwkatvwYTEW2dXBAyAdCnGQbOjO5iSxpT0mOb2U="}`));

    const apiRes = await request({
      uri: 'https://127.0.0.1:8002/api/v1/node/trx/ef932ffa-87cb-4bea-bbb0-28c93ce062f7',
      rejectUnauthorized: false,
      json: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: {"TrxItem":"72EIgZqxtSa/jiYTfESW7SMBPA1w0OtExTn8aF6TsDGowWDWgPHuR4h5QrbR7yqRz8ff+Afkgnp4A3XBRE8uXd2DP0r5yFedTWi4SME+9l1oXMPe7hluwSAPX13wF03w1YJX56eHVQBqdDnJzq3D1nEblJgorYWqooMKR4ub7XfHmjz9igkDbcFPYUvk+l+ymmBaPMKqP2rtchVj/fsWcUQgq/g8gyIomKea6/+rI8TUvRuVv0h9hjEgFC8q2DyTNyO6S5m6h/mhMPIyROXecykBVljn5k85sJmT7ZGDxxpen3JljxDJO6jGmljoJNy8LXoKVzxt6xj6GtBi5F+LahanmI3OGm79YsJu3+Pw/FnNO+9oy/PDSHlVgI6MW9fvD/UtrijzKzsfHskxoBXp0va2MCJRyIP+mjtfgvvKMaR1wzmKhPIpH009ed2N5h5eOLKsuhwuxrvMrig5zUbD2L3ZI34RC5c4WQPglVx700MDOykbhUVHHD4cRPk6moJ347x6RXNb7u4FpQzMh9l7or5ul+qp8ULNazXD2Cp0LoF5wIaN8p/jfZmOcBnYjrjyqZvPZ+1mYSy6DqDiFEb08ML6HyXos4k8L3gwmDqm2ydhScgbanaw3KrHFqLWyfb8sO1i9xe6imYGaEdI+ZkfymGE5PvjlBJoaMm0JPStXbf9GMg3Divvp+f3AC3FEIYiQQc64Ex9Lg+9QSdKna2ZtSCcc6j0hguSCrKuPlakrdtJ4wcedoC9prH0W5qcY5+FZO5Fb8xdAjYJPHSgrrYOcaeeRU+PeAz9BC39Z/wsskKOkkn+eVy7QzZ0xzcK5qltlVpoMNlG/ZIdbsigQ14oxl0kWO4+FWkaiGBIfSAkW9iV5ilrxneJci1+TAWvfOdIhcGG8R6QUAA="},
    }).promise();
    console.log({ apiRes });
    
  } catch (err) {
    console.log(err);
  }
}
const bufferToReadableHexString = (buffer) => {
  const ret = buffer.toString('hex').match(/[a-z0-9][a-z0-9]/g);
  console.log('16进制：[', ret.join(''), ']\n');
}

main();
