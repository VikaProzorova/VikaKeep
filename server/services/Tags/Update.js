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
        return this.model.Tag.update({name: data.name}, {
            where: { id: data.id },
            limit: 1,
        })
        .then(() => ({
            data: data,
            status: 1
        }))
    }
};

module.exports = Update;