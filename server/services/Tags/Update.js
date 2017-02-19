const Base = require('../Base');

class Update extends Base {
    validate (data) {
        const rules =  {
            name: [ 'required', {max_length: 1000} ],
            id:   [ 'required', 'positive_integer']
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .updateTag(data)
        .then(tag => {
            return {
                data: tag,
                status: 1
            };
        });
    }
};

module.exports = Update;