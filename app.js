var express = require('express');
var app     = express();


app.get('/notes', function(req, res){
    var notes = [
       { text: "Lorem ipsum", date: '2015-05-26T21:10:36.511Z' },
       { text: "Some text", date: '2014-01-20T21:09:35.511Z' }
    ];

    res.send({
       data: notes,
       count: notes.length
    });

});

app.listen(3000);