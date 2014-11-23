console.log('Loading express server...');

var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var express = require('express');
var api = require('../api/api');

var app = express();

app.use('/build', express.static('build'));

app.use('/', express.static('./build'));

app.use(express.static('demo'));
app.use(express.static('build/images'));

if (process.env.NODE_ENV === 'dev') {
    app.use('/bower_components',  express.static('bower_components'));
}

app.get('/', function(req, res) {
    res.send('Default Express server response. Perhaps you should run grunt serve --dev or --build');
});

app.use(function(req, res, next) {
    var root = 'build';
    console.log('Falling back to ' + root + '/index.html instead of ' + req.url);
    req.url = '/build/index.html';
    next();
});

module.exports = app;
