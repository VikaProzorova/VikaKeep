const Base = require('../Base');

class Create extends Base {
    validate (data) {
        const rules =  {
            name: [ {max_length: 1000} ]
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        const tag = {
            name: data.name,
            userId: this.userId
        }
        return this.model.Tag.create(tag)
        .then(tag => {
            return {
                data: tag,
                status: 1
            };
        })
    }
};

module.exports = Create;