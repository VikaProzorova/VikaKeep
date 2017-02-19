const Base = require('../Base');

class Create extends Base {
    validate (data) {
        const rules =  {
            name: [ {max_length: 1000} ]
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .createTag(data)
        .then(tag => {
            return {
                data: tag,
                status: 1
            };
        })
    }
};

module.exports = Create;