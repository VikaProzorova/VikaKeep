var util = require('util');
var Base = require('../Base');

function Update (data) {
    Update.super_.call(this, data);
};

util.inherits(Update, Base);

Update.prototype.validate = function(data) {
    var rules =  {
        name:      [ 'required', {min_length: 2} ],
        email:     [ 'required', 'email' ],
    };

    return this.runValidation(data, rules);
}

Update.prototype.execute = function(data) {
    return this.storage
    .updateUser(data)
    .then(function(user) {
        return {
            data:   user,
            status: 1
        };
    })
};

module.exports = Update;