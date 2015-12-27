var LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);
var Promise = require('bluebird');

function Base(params) {
    this.userID  = params.userID;
    this.Storage = params.Storage;
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
    this.storage = new this.Storage({id: this.userID});
    try {
        return this.execute( this.validate(data) );
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = Base;