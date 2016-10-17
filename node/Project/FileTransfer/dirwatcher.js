var fs = require('fs');

var watcher = function(){
    fs.watch('./tmp', 
        {encoding: 'buffer'}, 
        (event, filename) => {
            console.log(filename);
        });
}

console.log(watcher);