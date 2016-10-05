var dgram = require("dgram");
var fs = require("fs");
var net = require("net");
var socket = dgram.createSocket("udp4");

var data;


socket.on("message", (msg, rinfo) => {
    //``符号可以使用${}变量表达式
    // console.log(`GET MSG: [ ${msg} ] from ${rinfo.address}:${rinfo.port}`);

    data += msg;

    // fs.writeFileSync("img.jpg", msg);
});

socket.on("close", () => {
    
    fs.writeFileSync("img.jpg", data);
});

socket.bind("9876");