var Storage = require('../storage');
var LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
var Promise = require('bluebird');

function Base(userID) {
    this.userID  = userID;
}

Base.prototype.runValidation = function(data, rules) {
    var validator = new LIVR.Validator(rules);
    var result    = validator.validate(data);
    if (!result) {
        throw validator.getErrors();
    }
    return result;
}

Base.prototype.run = function(data) {
    this.storage = new Storage({id: this.userID});
    try {
        return this.execute( this.validate(data) );
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = Base;