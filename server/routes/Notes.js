const Base = require('./Base');

class Notes extends Base {
    list (req, res) {
        const promise = this.services('Notes/List', {}, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    create (req, res) {
        const promise = this.services('Notes/Create', req.body, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    update (req, res) {
        const data = {
            text: req.body.text,
            id:   req.params.id
        }
        const promise = this.services('Notes/Update', data, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    delete (req, res) {
        const data = {
            id: req.params.id
        }
        const promise = this.services('Notes/Delete', data, req.signedCookies.id);
        this.renderPromise(promise, res);
    }
}

module.exports = Notes;