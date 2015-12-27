var util = require('util');
var Base = require('../Base');

function Login (data) {
    Login.super_.call(this, data);
};

util.inherits(Login, Base);

Login.prototype.validate = function(data) {
    var rules =  {
        email:     [ 'required', 'email' ],
        password:  [ 'required', {min_length: 6} ],
    };

    return this.runValidation(data, rules);
}

Login.prototype.execute = function(data) {
    return this.storage
    .loginUser(data)
    .then(function(user) {
        return {
            data:   user,
            status: 1
        };
    });
};

module.exports = Login;