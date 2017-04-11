const Base = require('../Base');

class ChangeStatus extends Base {
    validate (data) {
        const rules = {
            id: [ 'required', 'positive_integer'],
            status: [ 'required', { one_of: ['NEW', 'IN_PROGRESS', 'PENDING', 'DONE', 'DELETED']} ]
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.model.Note.update({status: data.status}, {
            where: { id: data.id },
            limit: 1,
        })
        .then(() => ({
            data: data,
            status: 1
        }))
    }
};

module.exports = ChangeStatus;