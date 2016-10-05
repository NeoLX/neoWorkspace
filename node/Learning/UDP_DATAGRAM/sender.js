var dgram = require("dgram");
var socket = dgram.createSocket("udp4");

var message = "HELLO WORLD";

socket.send(message,
    0,
    message.length,
    9876,
    "localhost",
    (err) => {
        console.log(err);
    }
);