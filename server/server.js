var fs         = require('fs');
var express    = require('express');
var bodyParser = require('body-parser');
var db         = require('mysql-promise')();
var config     = require('./config');

db.configure(config);

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('../client'));

var notes = [
   { id: 1, text: "Lorem ipsum", date: '2011-05-26T21:10:36.511Z' },
   { id: 2, text: "Some text", date: '2014-01-20T21:09:35.511Z' }
];

app.get('/notes', function(req, res) {
    db.query('SELECT * FROM notes')
    .spread(function(notesFromDB) {
        res.send({
           data: notesFromDB.filter(function(note) {
                return !note.isDeleted;
           }),
           count: notesFromDB.length
        });
    });
});

app.post('/notes', function(req, res) {
    var note  = req.body;
    note.date = new Date();

    db.query('INSERT INTO notes (text, date) VALUES (?, ?)', [note.text, note.date])
    .spread(function(queryStatus) {
        console.log(queryStatus);
        note.id = queryStatus.insertId;

        res.send({
            data: note,
            status: 1
        });
    });
});

app.post('/notes/:id', function(req, res) {
    var newNoteData  = req.body;
    newNoteData.id   = req.params.id;
    newNoteData.date = new Date();

    db.query('UPDATE notes SET text = ?, date = ? WHERE id = ?', [newNoteData.text, newNoteData.date, newNoteData.id])
    .spread(function() {
        res.send({
            data: newNoteData,
            status: 1
        })
    })
});

app.delete('/notes/:id', function(req, res) {
    var noteID = req.params.id;

    db.query('UPDATE notes SET isDeleted = true WHERE id = ?', [noteID])
    .then(function() {
        res.send({status: 1})
    })
})

app.listen(3000);