var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('supertest');

app.use(morgan('combined'));

app.get('/:endpoint', function (req, res) {
    res.send('Hello ' + req.params.endpoint);
});

//var server = app.listen(3000, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//
//    console.log('Example app listening at http://%s:%s', host, port);
//});

request(app)
    .get('/fred')
    .expect('Content-Type', /text\/html; charset=utf-8/)
    .expect(200)
    .end(function(err, res){
        console.log(res.text)
        if (err) throw err;
    });