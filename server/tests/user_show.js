var supertest = require('supertest-as-promised');
var app       = require('../app.js');
var assert    = require('chai').assert;
var request   = supertest.agent(app);


test("Positive: show user", function() {
    return request.post('/api/users/login').send({
        email: 'ololo111@mail.com',
        password: '111111'
    }).then(function(res) {
        return request.get('/api/users/current').send({
            id: res.body.data.id
        });
    }).then(function(res) {
        assert.ok(res.body.status);
        console.log('!!!!!!!!!!', res.body);
    });
});
