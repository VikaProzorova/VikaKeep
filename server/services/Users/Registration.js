var util = require('util');
var Base = require('../Base');

function Registration (data) {
    Registration.super_.call(this, data);
};

util.inherits(Registration, Base);

Registration.prototype.validate = function(data) {
    var rules =  {
        name:      [ 'required', {min_length: 2} ],
        email:     [ 'required', 'email' ],
        password:  [ 'required', {min_length: 6} ],
    };

    return this.runValidation(data, rules);
}

Registration.prototype.execute = function(data) {
    return this.storage
    .registerUser(data)
    .then(function(user) {
        return {
            data:   user,
            status: 1
        };
    });
};

module.exports = Registration;