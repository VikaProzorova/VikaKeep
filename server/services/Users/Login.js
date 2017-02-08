const Base = require('../Base');

class Login extends Base {
    validate (data) {
        const rules =  {
            email:     [ 'required', 'email' ],
            password:  [ 'required', {min_length: 6} ],
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .loginUser(data)
        .catch(error => {
            if (error == "Wrong password") {
                throw {
                    password: "WRONG_PASSWORD"
                }
            }
            throw error
        })
        .then(user => {
            return {
                data: user,
                status: 1
            };
        });
    };
};

module.exports = Login;