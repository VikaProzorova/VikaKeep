const Base = require('../Base');

class List extends Base {
    validate (data) {
        return true;
    }

    execute (data) {
        return this.storage
        .getNotesList()
        .then(notesList => {
            return {
                data: notesList,
                status: 1
            };
        });
    }
};

module.exports = List;