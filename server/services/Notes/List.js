const Base = require('../Base');

class List extends Base {
    validate (data) {
        const rules = {
            tagID: ['positive_integer']
        }
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .getNotesList(data)
        .then(notesList => {
            return {
                data: notesList,
                status: 1
            };
        });
    }
};

module.exports = List;