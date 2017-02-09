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
        .catch(error => {
            if (error == "Email already exist") {
                throw {"email": "NOT_UNIQUE"}
            }
            throw error
        })
        .then(user => {
            return {
                data: user,
                status: 1
            };
        })
    };
};

module.exports = Registration;