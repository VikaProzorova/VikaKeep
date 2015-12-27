var util = require('util');
var Base = require('../Base');

function Create (data) {
    Create.super_.call(this, data);
};

util.inherits(Create, Base);

Create.prototype.validate = function(data) {
    var rules =  {
        text: [ {max_length: 1000} ]
    };

    return this.runValidation(data, rules);
}

Create.prototype.execute = function(data) {
    return this.storage
    .createNote(data)
    .then(function(note) {
        return {
            data:   note,
            status: 1
        };
    })
}

module.exports = Create;