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
        return this.model.User.update({name: data.name, email: data.email}, {
            where: { id: this.userId },
            limit: 1,
        })
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


module.exports = Update;