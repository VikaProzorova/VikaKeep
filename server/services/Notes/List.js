const Base = require('../Base');

class List extends Base {
    validate (data) {
        console.log(data, 'servi')
        const rules = {
            tagsIDs: [ {list_of: 'integer'}],
            statuses: [{list_of: {max_length: 1000}}]
        }
        return this.runValidation(data, rules);
    }

    execute (data) {
        console.log(data, "ser")
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