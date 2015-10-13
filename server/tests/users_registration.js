var supertest = require('supertest');
var app       = require('../app.js');
var assert    = require('chai').assert;
var request   = supertest.agent(app);

test("Positive: registration user", function() {
    return request.post('/api/users/registration').send({
        email: 'ololo111@mail.com',
        name:  'Daniel',
        password: '111111'
    }).expect(function(res){
        assert.ok(res.body.status);
        console.error(res.body);
    });
})