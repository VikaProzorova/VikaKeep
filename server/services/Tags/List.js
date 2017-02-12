const Base = require('../Base');

class List extends Base {
    validate (data) {
        return true;
    }

    execute (data) {
        return this.storage
        .getTagsList()
        .then(tags => {
            return {
                data: tags,
                status: 1
            };
        });
    }
};


module.exports = List;