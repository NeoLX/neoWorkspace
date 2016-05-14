'use strict'

var express = require("express");
var ss = require("./session.js");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

ss.init(app);

//测试router
var router = express.Router();

router.use(express.static("public"));

//路由router 路径为/router
app.use("/router", router);

app.listen(8081,
    function() {
        console.log("SERVER START");
    });