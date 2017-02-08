const Base = require('../Base');

class Update extends Base {
    validate (data) {
        const rules =  {
            text: [ {max_length: 1000} ],
            id:   [ 'required', 'positive_integer']
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .updateNote(data)
        .then(note => {
            return {
                data: note,
                status: 1
            };
        });
    }
};

module.exports = Update;