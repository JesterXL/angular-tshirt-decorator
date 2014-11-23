console.log('Loading restify server...');

var restify = require('restify');

var api = restify.createServer({name: 'my-api'});
api.listen(3000, function () {
    console.log('%s listening at %s', api.name, api.url)
});
api.use(restify.fullResponse())
    .use(restify.bodyParser())
    .get('/ping', function (req, res, next) {
        res.send(200, {response: 'pong'});
    });

module.exports = api;
