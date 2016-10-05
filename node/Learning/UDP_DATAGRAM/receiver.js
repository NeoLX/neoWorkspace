var dgram = require("dgram");
var socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
    //``符号可以使用${}变量表达式
    console.log(`GET MSG: [ ${msg} ] from ${rinfo.address}:${rinfo.port}`);
});

socket.bind("9876");