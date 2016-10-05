var dgram = require("dgram");
var fs = require("fs");
var sender = dgram.createSocket("udp4");
var receiver = dgram.createSocket("udp4");

//***********DATA********************
var Data = {};
Data.newDataPacket = function(idx, len, data, isEnd){
    
    var pkg = {
        idx: idx,
        len: len,
        data: data,
        isEnd: isEnd
    };
    return pkg;
}

//***************RECEIVER***************
var pkgList = [];

receiver.on("message", (msg, rinfo) => {
    //``符号可以使用${}变量表达式
    // console.log(`GET MSG: [ ${msg} ] from ${rinfo.address}:${rinfo.port}`);
    // console.log("incoming msg:");

    var d = msg.toString();
    // console.log(d);

    var pkg = JSON.parse(d);

    console.log(`incoming msg:[${pkg.idx}][${pkg.len}]`);

    pkgList.push(pkg);

    if(pkg.isEnd){
        pkgList.sort((a, b) => {
            if(a.idx < b.idx){
                return 1;
            }else{
                return 0;
            }
        });

        for(var i = 0; i < pkgList.length ; i++){
            
            console.log(pkgList[i].idx);
        }
    }

    data += msg;

    // fs.writeFileSync("img.jpg", msg);
});
receiver.bind(9876);


//***************SENDER********************
var data = fs.readFileSync("./01-01.jpg");
// var message = "HELLO WORLD";

const DATA_PKG_LEN = 18000;

// console.log(data);

var offset = 0,
    totalLen = data.length;

var i = 0;
while(offset < totalLen){
    var bf,pkg;

    if(totalLen - offset > DATA_PKG_LEN){
        
        bf = new Buffer(DATA_PKG_LEN);

        data.copy(bf, 0, offset, offset + DATA_PKG_LEN);

        pkg = Data.newDataPacket(
                        i++, 
                        DATA_PKG_LEN,
                        bf,
                        false
                        );
    }else{
        
        bf = new Buffer(totalLen - offset);

        data.copy(bf, 0, offset, totalLen);

        pkg = Data.newDataPacket(
                        i++, 
                        totalLen - offset,
                        bf,
                        true
                        );
    }

    console.log(`SENDING DATA FROM ${offset} to ${offset + pkg.len}`);

    var pkgStr = JSON.stringify(pkg); 
    console.log(`MSGSIZE${pkgStr.length}`);

    sender.send(pkgStr,
        0,
        pkgStr.length,
        9876,
        "localhost",
        (err) => {
            // console.log(err);
        }
    );

    offset += pkg.len;
}

