const Base = require('../Base');

class Tags extends Base {
    validate (data) {
        return true;
    }

    execute (data) {
        return this.storage
        .getAllTags()
        .then(allTags => {
            return {
                data: allTags,
                status: 1
            };
        });
    }
};


module.exports = Tags;