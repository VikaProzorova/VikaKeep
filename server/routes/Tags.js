const Base = require('./Base');

class Tags extends Base {
    list (req, res) {
        const promise = this.services('Tags/List', {}, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    create (req, res) {
        const promise = this.services('Tags/Create', req.body, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    update (req, res) {
        const data = {
            name: req.body.name,
            id:   req.params.id
        }
        const promise = this.services('Tags/Update', data, req.signedCookies.id);
        this.renderPromise(promise, res);
    }
}

module.exports = Tags;