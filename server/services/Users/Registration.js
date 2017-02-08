const Base = require('../Base');

class Registration extends Base {
    validate (data) {
        const rules =  {
            name:      [ 'required', {min_length: 2} ],
            email:     [ 'required', 'email' ],
            password:  [ 'required', {min_length: 6} ],
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .registerUser(data)
        .then(user => {
            return {
                data: user,
                status: 1
            };
        })
    };
};

module.exports = Registration;