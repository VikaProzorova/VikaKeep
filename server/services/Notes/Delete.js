var util = require('util');
var Base = require('../Base');

function Delete (data) {
    Delete.super_.call(this, data);
};

util.inherits(Delete, Base);

Delete.prototype.validate = function(data) {
    var rules =  {
        id:   [ 'required', 'positive_integer']
    };

    return this.runValidation(data, rules);
}

Delete.prototype.execute = function(data) {
    return this.storage
    .deleteNote({ id: data.id })
    .then(function() {
        return {status: 1}
    });
}

module.exports = Delete;