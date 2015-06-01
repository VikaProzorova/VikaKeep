var fs         = require('fs');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('../client'));

var notes = [
   { text: "Lorem ipsum", date: '2011-05-26T21:10:36.511Z' },
   { text: "Some text", date: '2014-01-20T21:09:35.511Z' }
];

app.get('/notes', function(req, res){

    res.send({
       data: notes,
       count: notes.length
    });

});

app.post('/notes', function(req, res){
    var note  = req.body;
    note.date = new Date();

    console.log(note);
    notes.unshift(note);

    res.send({
        data: note,
        status: 1
    });

});

app.listen(3000);