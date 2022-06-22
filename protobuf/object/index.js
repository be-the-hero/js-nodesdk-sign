const protobufjs = require('protobufjs');

protobufjs.load("object.proto", function(err, root) {
  if (err)
      throw err;

  var _Object = root.lookupType("quorumPb._Object");

  var objectPayload = {
    type: "Note",
    content: "simple note by aa",
    name: "A simple Node id1" 
  };

  var errMsg = _Object.verify(objectPayload);
  if (errMsg)
      throw Error(errMsg);


  var message = _Object.create(objectPayload);

  var buffer = _Object.encode(message).finish();

  var message = _Object.decode(buffer);

  var object = _Object.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
  });

  const prefixBuffer = Buffer.from("0A24747970652E676F6F676C65617069732E636F6D2F71756F72756D2E70622E4F626A65637412", "hex");
  
  console.log(object, '\n');
  bufferToReadableHexString(Buffer.concat([prefixBuffer, Buffer.from([buffer.length]), buffer]))
  bufferToReadableDecString(Buffer.concat([prefixBuffer, Buffer.from([buffer.length]), buffer]))
});

const bufferToReadableDecString = (buffer) => {
  const ret = buffer.toString('hex').match(/[a-z0-9][a-z0-9]/g).map((item) => parseInt(item, 16));
  console.log('10进制：[', ret.join(' '), ']');
}

const bufferToReadableHexString = (buffer) => {
  const ret = buffer.toString('hex').match(/[a-z0-9][a-z0-9]/g);
  console.log('16进制：[', ret.join(' '), ']\n');
}
