var util = require('util');
var Base = require('../Base');

function ChangePassword (data) {
    ChangePassword.super_.call(this, data);
};

util.inherits(ChangePassword, Base);

ChangePassword.prototype.validate = function(data) {
    var rules =  {
        oldPassword:  [ 'required', {min_length: 6} ],
        newPassword:  [ 'required', {min_length: 6} ]
    };

    return this.runValidation(data, rules);
}

ChangePassword.prototype.execute = function(data) {
    return this.storage
    .changePasswordUser(data)
    .then(function(user) {
        return {
            data:   user,
            status: 1
        };
    });
};

module.exports = ChangePassword;