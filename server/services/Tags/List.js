const Base = require('../Base');

class List extends Base {
    validate (data) {
        return true;
    }

    execute (data) {
        return this.model.Tag.findAll({
            where: {
                userId: this.userId
            }
        })
        .then(tags => {
            return {
                data: tags,
                status: 1
            };
        });
    }
};


module.exports = List;