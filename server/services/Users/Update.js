const Base = require('../Base');

class Update extends Base {
    validate (data) {
        const rules =  {
            name:      [ 'required', {min_length: 2} ],
            email:     [ 'required', 'email' ],
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .updateUser(data)
        .then(user => {
            return {
                data: user,
                status: 1
            };
        })
    };
};

module.exports = Update;