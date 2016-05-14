var lobby = require('lobby');

var WEB_CONTENT = "/webcontent";

var server = new lobby(__dirname, WEB_CONTENT);
// server.init();
server.start();