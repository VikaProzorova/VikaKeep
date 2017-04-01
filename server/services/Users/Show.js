const Base = require('../Base');

class Show extends Base {
    validate (data) {
        return true;
    };

    execute () {
        const query = {
            where: {
               id: this.userId
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
            return {
                data: {
                    name: user.name,
                    email: user.email
                },
                status: 1
            };
        });
    };
};

module.exports = Show;