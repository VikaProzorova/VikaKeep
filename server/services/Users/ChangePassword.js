const Base = require('../Base');

class ChangePassword extends Base {
    validate (data) {
        const rules =  {
            oldPassword:  [ 'required', {min_length: 6} ],
            newPassword:  [ 'required', {min_length: 6} ]
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.storage
        .changePasswordUser(data)
        .catch(error => {
            if (error == "Wrong password") {
                throw {
                    oldPassword: "WRONG_PASSWORD"
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

module.exports = ChangePassword;