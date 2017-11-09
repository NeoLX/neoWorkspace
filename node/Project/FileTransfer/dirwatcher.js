var chokidar = require('chokidar');

var serverStart = (configs) => {

    chokidar.watch(
        configs.watchDir,
        { ignored: /(^|[\/\\])\../ }).on('all', (event, path) => {
            console.log(event, path);
        });
}

var c = {
    watchDir: "/Users/kfzx-luoxu/"
}

serverStart(c);