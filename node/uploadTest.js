var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer((req, res) => {
    var urlstr = url.parse(req.url);

    req.on("data", (data) => {
        console.log(data);
        fs.writeFile("testimg.jpg", data);
        res.end();
    });
}).listen(8088);

function upload(){

    var boundaryKey = '----' + new Date().getTime();

    var options = {

        host:'localhost',//远端服务器域名

        port:8088,//远端服务器端口号

        method:'POST',

        path:'/upload',//上传服务路径

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

    // req.write(

    //     '–' + boundaryKey + '\r\n' +

    //     'Content-Disposition: form-data; name=“upload”; filename=“test.zip”\r\n' +

    //     'Content-Type: application/x-zip-compressed\r\n\r\n'

    // );

    //设置1M的缓冲区

    var fileStream = fs.createReadStream('./01-01.jpg'
        // ,{bufferSize:1024 * 1024}
        );

    fileStream.pipe(req,{end:false});

    fileStream.on('end',function(){

        req.end('');

    });

}

upload();