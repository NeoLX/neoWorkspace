var http = require("http");

// var port = 10000;
// var url = `http://localhost:${port}`;

// console.log(`start get [${url}]`);
// http.get('http://localhost:10000', function (res) {
//     console.log(res.text);
// }).on('error', (e) => {
//     console.log(e);
// });

const options = {
    // hostname: 'localhost',
    port: 10000,
    // path: '/',
    // method: 'get',
    // headers: {}
};

const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //     console.log(`响应主体: ${chunk}`);
    // });
    res.on('end', () => {
        console.log('响应中已无数据。');
    });
});

req.on('error', (e) => {
    console.log(e);
});

req.write("abc=123");
req.end();
console.log("aa");
