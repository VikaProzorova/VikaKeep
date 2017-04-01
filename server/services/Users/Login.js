const Base = require('../Base');
const bcrypt = require('bcrypt');

class Login extends Base {
    validate (data) {
        const rules =  {
            email:     [ 'required', 'email' ],
            password:  [ 'required', {min_length: 6} ],
        };
        return this.runValidation(data, rules);
    }

    execute (data) {
        const query = {
            where: {
               email: data.email
            }
        }

        return this.model.User.findOne(query)
        .then(user => {
            if (!user) {
                throw "User not exist";
            }

            return user
        })
        .then(user => {
            return bcrypt.compare(data.password, user.password)
            .then(isValidPassword => {
                if (!isValidPassword) {
                    throw {
                        password: "WRONG_PASSWORD"
                    }
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
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

module.exports = Login;