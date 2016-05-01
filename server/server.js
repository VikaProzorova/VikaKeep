"use strict";

var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var app          = express();
var router       = express.Router();

module.exports   = function(config) {
    var Storage  = require('./Storage')({config: config.db});
    var services = require('./services')({config: null, Storage: Storage});
    var routes   = require('./routes')({config: config.app, services: services});

    app.use(cookieParser(config.app.secret));
    app.use(bodyParser.json()); // for parsing application/json
    app.use('/api', router);

    var auth = function(req, res, next) {
        var id = req.signedCookies.id;

        if (id) return next();
        res.send({
            status: 0,
            error:  "Permission denied"
        });
    };

    router.get ('/notes',                  auth, routes('Notes/list') );
    router.post('/notes',                  auth, routes('Notes/create') );
    router.post('/notes/:id',              auth, routes('Notes/update') );
    router.delete('/notes/:id',            auth, routes('Notes/delete') );
    router.post('/users/registration',           routes('Users/registration') );
    router.post('/users/login',                  routes('Users/login') );
    router.post('/users/logout',           auth, routes('Users/logout') );
    router.get ('/users/current',          auth, routes('Users/show') );
    router.post('/users/current',          auth, routes('Users/update') );
    router.post('/users/current/password', auth, routes('Users/changePassword') );

    return {
        app: app,
        Storage: Storage,
        services: services,
        routes: routes,
    };
};