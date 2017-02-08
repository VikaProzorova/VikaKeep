const Base = require('../Base');

class Delete extends Base {
    validate (data) {
        const rules = {
            id: [ 'required', 'positive_integer']
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .deleteNote({ id: data.id })
        .then(() => ({status: 1}))
    }
};

module.exports = Delete;