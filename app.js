var fs      = require('fs');
var express = require('express');
var cors    = require('express-cors');
var app     = express();

app.use(cors({
    origin:      true,
    credentials: true,
}));

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

app.get('/', function(req, res){
    var index = fs.readFileSync('D:\\js\\VikaKeep\\MyNotes.html').toString();

    res.send(index);

});
app.listen(3000);