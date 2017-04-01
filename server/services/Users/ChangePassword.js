const Base = require('../Base');
const bcrypt = require('bcrypt');

class ChangePassword extends Base {
    validate (data) {
        const rules =  {
            oldPassword:  [ 'required', {min_length: 6} ],
            newPassword:  [ 'required', {min_length: 6} ]
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        return this.model.User.findOne({where: { id: this.userId }})
        .then(foundUser => {
            return bcrypt.compare(data.oldPassword, foundUser.password)
            .then(isValidPassword => {
                if (!isValidPassword) {
                    throw {
                        oldPassword: "WRONG_PASSWORD"
                    }
                }
                return bcrypt.hash(data.newPassword, 10)
                .then((hash) => {
                    return this.model.User.update({password: hash}, {
                        where: { id: this.userId },
                        limit: 1,
                    })
                })
            })
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