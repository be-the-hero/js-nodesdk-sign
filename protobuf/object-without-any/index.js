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

  console.log(object);
  console.log(buffer);
});

