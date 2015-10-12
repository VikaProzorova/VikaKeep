var util = require('util');
var Base = require('../Base');

function Update (data) {
    Update.super_.call(this, data);
};

util.inherits(Update, Base);

Update.prototype.validate = function(data) {
    var rules =  {
        text: [ {max_length: 1000} ],
        id:   [ 'required', 'positive_integer']
    };

    return this.runValidation(data, rules);
}

Update.prototype.execute = function(data) {
    return this.storage
    .updateNote(data)
    .then(function(note) {
        return {
            data:   note,
            status: 1
        };
    });
}

module.exports = Update;