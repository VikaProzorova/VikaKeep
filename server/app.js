const config = require('./etc/config');
const server = require('./server')(config);

server.app.listen(config.app.port, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('App listen', config.app.port);
    }
});