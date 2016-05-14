'use strict'

var express = require("express");

var app = express();

//测试router
var router = express.Router();

router.all("/hello",
    function(req,res,next){
        res.end("HELLO WORLD!");
        next();
    });
    
router.use(express.static("public/p1"));

//路由router 路径为/router
app.use("/router", router);
console.log(router);

//**************验证根路径（/）路由***************
//测试router1 配置与router一致
var router1 = express.Router();

router1.all("/hello",
    function(req,res,next){
        res.end("HELLO WORLD!");
        next();
    });
    
router1.use(express.static(__dirname + "/public/p1"));

//路由router1 路径为/
app.use("/", router1);
console.log(router1);
//**************验证根路径（/）路由***************

//静态文件访问 路径为router
// app.use(express.static(__dirname + "/public"));



app.listen(8081,
    function(){
        console.log("SERVER START");   
    });
    
//**************验证server启动后是否还能添加router***************
//测试router2 配置与router一致
var router2 = express.Router();

router2.all("/hello",
    function(req,res,next){
        res.end("HELLO WORLD!");
        next();
    });
    
router2.use(express.static(__dirname + "/public/p1"));    

//路由router2 路径为/r2
app.use("/r2", router2);    
console.log(router2);
//**************验证server启动后是否还能添加router***************

//request on /router/hello
//response HELLO WORLD!

//request on /router/hello
//response HELLO WORLD!