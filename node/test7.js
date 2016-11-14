'use strict'

var events = require('events');
var pather = require("path");
var util = require('util');

var a = function(){
    var ab = function(bb){
        console.log(bb);
    };

    var ac = function(bb, cc){
        console.log(bb);
        console.log(cc);
    };

    this.on("b", ab);
    this.on("b", ac);


    this.start = () => {

        var args = ["b", "oa", "ob"];

        this.emit(args);
    };
}
util.inherits(a, events.EventEmitter);

var aa = new a();
aa.start();