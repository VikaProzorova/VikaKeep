var assert    = require('chai').assert;
var helper    = require('./helper');

var reqest = helper.getClient();

test("Positive: registration user", function() {
    return helper.dropDB()
    .then(function() {
        return helprequest.post('/api/users/registration').send({
            email: '31@mail.com',
            name:  'Daniel',
            password: '111111'
        }).expect(function(res){
            assert.ok(res.body.status);
            console.error(res.body);
        });

    })
})