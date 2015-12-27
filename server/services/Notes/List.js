var util = require('util');
var Base = require('../Base');

function List (data) {
    List.super_.call(this, data);
};

util.inherits(List, Base);

List.prototype.validate = function(data) {
    return true;
}

List.prototype.execute = function(data) {
    return this.storage
    .getNotesList()
    .then(function(notesList){
        return {
            data:   notesList,
            status: 1
        };
    });
}

module.exports = List;