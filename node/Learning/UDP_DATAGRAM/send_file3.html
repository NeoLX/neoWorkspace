var http = require("http");
var express = require("express");
var fs = require("fs");
var url = require("url");
var chok = require("chokidar");
var pathHelper = require("path");

//监听文件夹
chok.watch("./img/",{depth:99}).on("all", (event, path) => {
    console.log("event:" + event);
    console.log("path:" + path);

    var pkg = {
        event: event,
        path: "/" + path.replace(pathHelper.sep, "/")
    };
    
    sendMessage(JSON.stringify(pkg));
});

//发送服务
function sendMessage(msg){

    var boundaryKey = '----' + new Date().getTime();

    var options = {

        host:'localhost',//远端服务器域名

        port:8088,//远端服务器端口号

        method:'POST',

        path:'/newfile',//上传服务路径

        headers:{

            'Content-Type':'multipart/form-data; boundary=' + boundaryKey,

            'Connection':'keep-alive'

        }

    };

    var req = http.request(
        options,
        function(res){

            res.setEncoding('utf8');

            res.on('data', function (chunk) {

                console.log('body: ' + chunk);

            });

            res.on('end',function(){

                console.log('res end.');

            });

    });

    req.end(msg);

}

//文件下载服务
var fileServer = express();

fileServer.use(express.static("./img/"));

fileServer.listen(8089);

//接收服务器
var app = express();

app.all("/newfile", (req, res) => {
    req.on("data", (data) => {
        var pkg = JSON.parse(data);
        console.log(pkg);

        if(pkg.event == "add"){
            download(pkg.path);
        }
    });

    res.end();
});

app.listen(8088);

//下载文件
function download(path){

    var boundaryKey = '----' + new Date().getTime();

    var options = {

        host:'localhost',//远端服务器域名

        port:8089,//远端服务器端口号

        method:'POST',

        path: path,//上传服务路径

        headers:{

            'Content-Type':'multipart/form-data; boundary=' + boundaryKey,

            'Connection':'keep-alive'

        }
    };

    var req = http.request(
        options,
        function(res){

            res.setEncoding('utf8');

            res.on('data', function (chunk) {

                console.log('body: ' + chunk);

            });

            res.on('end',function(){

                console.log('res end.');

            });

    });

    req.end();

}