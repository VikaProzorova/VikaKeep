var supertest = require('supertest-as-promised');
var app       = require('../server.js');
var assert    = require('chai').assert;
var request   = supertest.agent(app);

// var helper    = require('./helper');

test("Positive: login user", function() {
    return request.post('/api/users/login').send({
        email: 'ololo111@mail.com',
        password: '111111'
    }).expect(function(res){
        assert.ok(res.body.status);
        assert.ok(res.body.data);
        assert.ok(res.body.data.email == 'ololo111@mail.com');
        console.error(res.body);
    });
})