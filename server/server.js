"use strict";

const express      = require('express');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const app          = express();
const router       = express.Router();

module.exports   = function(config) {
    const Storage  = require('./Storage')({config: config.db});
    const services = require('./services')({config: null, Storage: Storage});
    const routes   = require('./routes')({config: config.app, services: services});

    app.use(cookieParser(config.app.secret));
    app.use(bodyParser.json());
    app.use('/api', router);

    const auth = function(req, res, next) {
        const id = req.signedCookies.id;

        if (id) return next();
        res.send({
            status: 0,
            error:  "Permission denied"
        });
    };

    router.get   ('/notes',                  auth, routes('Notes/list') );
    router.get   ('/tags',                   auth, routes('Tags/list') );
    router.post  ('/tags',                   auth, routes('Tags/create') );
    router.post  ('/tags/:id',               auth, routes('Tags/update') );
    router.post  ('/notes',                  auth, routes('Notes/create') );
    router.post  ('/notes/:id',              auth, routes('Notes/update') );
    router.delete('/notes/:id',              auth, routes('Notes/delete') );
    router.post  ('/users/registration',           routes('Users/registration') );
    router.post  ('/users/login',                  routes('Users/login') );
    router.post  ('/users/logout',           auth, routes('Users/logout') );
    router.get   ('/users/current',          auth, routes('Users/show') );
    router.post  ('/users/current',          auth, routes('Users/update') );
    router.post  ('/users/current/password', auth, routes('Users/changePassword') );

    return {
        app: app,
        Storage: Storage,
        services: services,
        routes: routes,
    };
};