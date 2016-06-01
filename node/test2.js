var webApp = require('./Project/Lobby/node_modules/lobby/lib/webApp2.js');
var base = require('./Project/Lobby/node_modules/lobby/lib/appBase.js');
var server = require('./Project/Lobby/node_modules/lobby/lib/server.js');
var express = require('./Project/Lobby/node_modules/lobby/node_modules/express');

// var b = new base();
// b.setStatus(100);

var app = express();
// var s = new server("./Project/Lobby/webcontent");
// s.start();

console.log(webApp);
// console.log(app);

var web = new webApp(app, "./Project/Lobby/webcontent/neotest1");

// app.listen(8081);

