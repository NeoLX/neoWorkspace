var arr = "abc".split("");
var dns = require("dns");

arr.forEach((c,i) => {
    if(arr.length/2>i+1){
        var t = c;
        arr[i] = arr[arr.length-1-i];
        arr[arr.length-1-i] = t;
    }
});
console.log(arr);

dns.lookup("www.runoob.com", (err, addr, family) => {
    console.log(addr);
    console.log(family);

    dns.reverse(addr, (e, hostnames) => {
        console.log(hostnames);
    });
});