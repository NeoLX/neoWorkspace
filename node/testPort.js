// var express = require('express');
var http = require('http');
var fs = require('fs');

var domain = `http://58.63.2.15`
var port = 10000;

var testing = function () {

    let submitReq = function () {

        http.get("http://ifconfig.me/ip", function (res) {

            let ip = '';
            res.on('data', (chunk) => { ip += chunk; });
            res.on('end', () => {
                if (ip) {

                    var url = `http://${ip.trim()}:${port}`;

                    console.log(`start get [${url}]`);
                    http.get(url, function (res) {
                        let rawData = '';
                        res.on('data', (chunk) => { rawData += chunk; });
                        res.on('end', () => {
                            try {
                                const parsedData = rawData;
                                if (parsedData == 'success') {
                                    console.log(`testing port[${port}] success`);
                                    fs.appendFileSync("ports", `${port}\n`);
                                }
                            } catch (e) {
                                console.log(`testing port[${port}] false`);
                                // console.error(e.message);
                            }

                            server.close();

                            port++;

                            testing();
                        });
                    }).on('error', function (e) {
                        console.log('timeout');

                        port++;
                        testing();
                    });
                }
            });
        });
    }

    let server = http.createServer(function (req, res) {

        // console.log(`get [${req}]`);
        res.end("success");
    }).listen(port, () => {
        // console.log(`server start`);
        setTimeout(submitReq, 1000);
    });
}

fs.appendFileSync("./ports", `begin`);
testing();
