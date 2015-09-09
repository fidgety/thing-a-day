var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/../public'));

app.get('*', function(req, res){
    var fullPath = path.resolve(__dirname + '/../public/index.html');
    res.sendfile(fullPath);
});

var server = app.listen(3004);