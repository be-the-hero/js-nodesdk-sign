const protobufjs = require('protobufjs');

// [type.googleapis.com/quorum.pb.Object]: object
const OBJECT_PREFIX_BUFFER = Buffer.from("0A24747970652E676F6F676C65617069732E636F6D2F71756F72756D2E70622E4F626A65637412", "hex");

exports.create = ({
  protoFileName, type, payload
}) => new Promise((resolve, reject) => {
  protobufjs.load(protoFileName, function(err, root) {
    if (err) {
      reject(err);
    }
    const object = root.lookupType(type);
    const errMsg = object.verify(payload);
    if (errMsg) {
      reject(errMsg);
      return;
    }
    const message = object.create(payload);
    const buffer = object.encode(message).finish();
    if (type.includes('Object')) {
      const result = Buffer.concat([OBJECT_PREFIX_BUFFER, Buffer.from([buffer.length]), buffer]);
      resolve(result);
    } else {
      resolve(buffer);
    }
  });
});