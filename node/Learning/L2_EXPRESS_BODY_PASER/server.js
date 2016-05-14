'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/hello", function(req,res,next){
    var data = "";
    
    console.log(req.body);
});

//测试router
var router = express.Router();

router.all("/hello",
    function(req,res,next){
        res.end("HELLO WORLD!");
        next();
    });
    
router.use(express.static("public"));

//路由router 路径为/router
app.use("/router", router);

app.listen(8081,
    function(){
        console.log("SERVER START");   
    });
