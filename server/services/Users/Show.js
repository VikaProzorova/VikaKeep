var util = require('util');
var Base = require('../Base');

function Show (data) {
    Show.super_.call(this, data);
};

util.inherits(Show, Base);

Show.prototype.validate = function(data) {
    return true;
};

Show.prototype.execute = function() {
    return this.storage
    .showUser({id: this.userID})
    .then(function(user) {
        return {
            data:   user,
            status: 1
        };
    });
};

module.exports = Show;