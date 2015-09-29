var fs           = require('fs');
var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var LIVR         = require('livr');
LIVR.Validator.defaultAutoTrim(true);

var config       = require('./config');
var Storage      = require('./storage');

var app          = express();
var router       = express.Router();

app.use(cookieParser(config.secret));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('../client'));
app.use('/api', router);




var auth = function(req, res, next) {
    var id = req.signedCookies.id;

    if (id) return next();
    res.send({
        status: 0,
        error:  "Permission denied"
    });
};

router.get('/notes', auth, function(req, res) {
    new Storage({id: req.signedCookies.id})
    .getNotesList()
    .then(function(notesList){
        res.send({
            data:   notesList,
            status: 1
        });
    });
});

router.post('/notes', auth, function(req, res) {
    var validator = new LIVR.Validator({
        text: [ {max_length: 1000} ],
    });

    var note = validator.validate(req.body);
    if (!note) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .createNote(note)
    .then(function(note) {
        res.send({
            data:   note,
            status: 1
        });
    });
});

router.post('/notes/:id', auth, function(req, res) {
    var validator = new LIVR.Validator({
        text: [ {max_length: 1000} ],
        id:   [ 'required', 'positive_integer']
    });

    var note = validator.validate({
        text: req.body.text,
        id:   req.params.id
    });
    if (!note) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .updateNote(note)
    .then(function(note) {
        res.send({
            data:   note,
            status: 1
        });
    });
});

router.delete('/notes/:id', auth, function(req, res) {
    var validator = new LIVR.Validator({
        id:   [ 'required', 'positive_integer']
    });

    var note = validator.validate({
        id:   req.params.id
    });
    if (!note) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .deleteNote({ id: req.params.id })
    .then(function() {
        res.send({status: 1})
    });
});

//===========================================================================//

router.post('/users/login', function(req, res) {
    var validator = new LIVR.Validator({
        email:     [ 'required', 'email' ],
        password:  [ 'required', {min_length: 6} ],
    });

    var user = validator.validate(req.body);
    if (!user) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .loginUser(user)
    .then(function(user) {
        res.cookie("id", user.id, {signed: true, httpOnly: false})
        res.send({
            data:   user,
            status: 1
        });
    })
    .catch(function(error){
        res.send({
            status: 0,
            error:  error
        })
    })
});

router.post('/users/registration', function(req, res) {
    var validator = new LIVR.Validator({
        name:      [ 'required', {min_length: 2} ],
        email:     [ 'required', 'email' ],
        password:  [ 'required', {min_length: 6} ],
    });

    var user = validator.validate(req.body);
    if (!user) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .registerUser(user)
    .then(function(user) {
        res.send({
            data:   user,
            status: 1
        });
    })
    .catch(function(error){
        res.send({
            status: 0,
            error:  error
        })
    })

});

router.post('/users/logout', function(req, res) {
    res.clearCookie("id");
    res.send({
        status: 1
    });
});

router.get('/users/current', function(req, res) {
    var user = {id: req.signedCookies.id};

    new Storage(user)
    .showUser(user)
    .then(function(user) {
        res.send({
            data:   user,
            status: 1
        });
    })
    .catch(function(error){
        res.send({
            status: 0,
            error:  error
        })
    })
});

router.post('/users/current', function(req, res) {
    var validator = new LIVR.Validator({
        name:      [ 'required', {min_length: 2} ],
        email:     [ 'required', 'email' ],
    });

    var user = validator.validate(req.body);
    if (!user) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .updateUser(user)
    .then(function(user) {
        res.send({
            data: user,
            status: 1
        });
    })
    .catch(function(error){
        res.send({
            status: 0,
            error:  error
        })
    })
});

router.post('/users/current/password', function(req, res) {
    var validator = new LIVR.Validator({
        oldPassword:  [ 'required', {min_length: 6} ],
        newPassword:  [ 'required', {min_length: 6} ]
    });

    var user = validator.validate(req.body);
    if (!user) {
        res.send({
            status: 0,
            error:  validator.getErrors()
        });
        return;
    }

    new Storage({id: req.signedCookies.id})
    .changePasswordUser(user)
    .then(function(user) {
        console.log(user);
        res.send({
            data: user,
            status: 1
        });
    })
    .catch(function(error){
        res.send({
            status: 0,
            error:  error
        })
    })
});

app.listen(config.port);