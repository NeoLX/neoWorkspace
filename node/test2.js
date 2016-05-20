var webApp = require('./Project/Lobby/node_modules/lobby/lib/webApp.js');
var server = require('./Project/Lobby/node_modules/lobby/lib/server.js');
var express = require('./Project/Lobby/node_modules/lobby/node_modules/express');

// var app = express();
var s = new server("./Project/Lobby/webcontent");
s.start();
// var web = new webApp(app, "./Project/Lobby/webcontent/neotest1");

// app.listen(8081);