const LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);

class Base {
    constructor (params) {
        this.userID  = params.userID;
        this.Storage = params.Storage;
    }

    runValidation (data, rules) {
        const validator = new LIVR.Validator(rules);
        const result    = validator.validate(data);
        if (!result) {
            throw validator.getErrors();
        }
        return result;
    }

    run (data) {
        this.storage = new this.Storage({id: this.userID});
        try {
            return this.execute( this.validate(data) );
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Base;