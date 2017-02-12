const Base = require('./Base');

class Tags extends Base {
    list (req, res) {
        const promise = this.services('Tags/List', {}, req.signedCookies.id);
        this.renderPromise(promise, res);
    }
}

module.exports = Tags;