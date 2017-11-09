var log4js = require("log4js");
var conf = require("../config/logConfig.json");

var logger = log4js.getLogger();

module.exports = logger;