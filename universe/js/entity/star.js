var starConfig = require('../config/starConfig.json');
var gUtil = require('../util/gUtils.js');

var star = function(){
    var object = {};

    object.x = Math.random() * starConfig.starSystem.maxR;
}