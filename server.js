let express = require('express'),
    app = express(),
    server;
function start() {
    app.disable('x-powered-by');

    app.use(express.static(__dirname + '/dist'));

    server = app.listen(process.env.PORT, () => {
        console.log('Server has stared.')
    });
}

exports.start = start;