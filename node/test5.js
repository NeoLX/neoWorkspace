var chok = require("chokidar");

chok.watch(".",{depth:99}).on("all", (event, path) => {
    console.log("event:" + event);
    console.log("path:" + path);
})