const Base = require('../Base');

class ChangeStatus extends Base {
    validate (data) {
        const rules = {
            id: [ 'required', 'positive_integer'],
            status: [ 'required', { one_of: ['NEW', 'IN_PROGRESS', 'DONE']} ]
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        console.log(data, '======')
        return this.storage
        .changeStatusNote(data)
        .then((note) => ({note: note, status: 1}))
    }
};

module.exports = ChangeStatus;