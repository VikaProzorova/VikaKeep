const Base = require('../Base');

class Show extends Base {
    validate (data) {
        return true;
    };

    execute () {
        return this.storage
        .showUser({id: this.userID})
        .then(user => {
            return {
                data: user,
                status: 1
            };
        });
    };
};

module.exports = Show;