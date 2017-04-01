const Base = require('../Base');
const bcrypt = require('bcrypt');

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
        const user = {
            name: data.name,
            email: data.email
        }

        return bcrypt.hash(data.password, 10)
        .then((hash) => {
            user.password = hash
        })
        .then(() => this.model.User.create(user))
        .catch(error => {
            if (error.name =='SequelizeUniqueConstraintError') {
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