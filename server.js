'use strict';
var express = require('express');
var app = express();
var port = 8080;

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('** BUILD **');
app.use(express.static('./build/'));
app.use('/*', express.static('./build/index.html'));

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log(
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
