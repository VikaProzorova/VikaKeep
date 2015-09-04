var fs           = require('fs');
var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var config       = require('./config');
var Storage      = require('./storage');

var app          = express();
var router       = express.Router();

app.use(cookieParser(config.secret));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('../client'));
app.use('/api', router);

var auth = function(req, res, next) {
    var email = req.signedCookies.email;

    if (email) return next();
    res.send({
        status: 0,
        error:  "Permission denied"
    });
};

router.get('/notes', auth, function(req, res) {
    var user = {
        email: req.signedCookies.email
    };

    new Storage(user).getNotesList()
    .then(function(notesList){
        res.send({
            data:   notesList,
            status: 1
        });
    });
});

router.post('/notes', auth, function(req, res) {
    var note  = req.body;
    var user  = {
        email: req.signedCookies.email
    };

    new Storage(user).createNote(note)
    .then(function(note) {
        res.send({
            data:   note,
            status: 1
        });
    });
});

router.post('/notes/:id', auth, function(req, res) {
    var newNoteData  = req.body;
    newNoteData.id   = req.params.id;
    var user         = {
        email: req.signedCookies.email
    };

    new Storage(user).updateNote(newNoteData)
    .then(function(newNoteData) {
        res.send({
            data:   newNoteData,
            status: 1
        });
    });
});

router.delete('/notes/:id', auth, function(req, res) {
    var user = {
        email: req.signedCookies.email
    };

    new Storage(user).deleteNote({ id: req.params.id })
    .then(function() {
        res.send({status: 1})
    });
});

router.post('/users/login', function(req, res) {
    var user = {
        email: req.signedCookies.email
    };
    new Storage(user).loginUser(req.body)
    .then(function(user) {
        res.cookie("email", user.email, {signed: true, httpOnly: false})
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
    var user = {
        email: req.signedCookies.email
    };
    new Storage(user).registerUser(req.body)
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
    res.clearCookie("email");
    res.send({
        status: 1
    });
});

router.get('/users/profile', function(req, res) {
    var user = {
        email: req.signedCookies.email
    };
    new Storage(user).showUser(user)
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

app.listen(config.port);