const Base = require('../Base');

class Create extends Base {
    validate (data) {
        const rules =  {
            text: [ {max_length: 1000} ]
        };

        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .createNote(data)
        .then(note => {
            return {
                data:   note,
                status: 1
            };
        })
    }
};

module.exports = Create;