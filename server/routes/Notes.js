const Base = require('./Base');

class Notes extends Base {
    list (req, res) {
        const data = {
            tagsIDs: this.getArrayFromQuery(req.query.tags),
            statuses: this.getArrayFromQuery(req.query.statuses)
        }

        const promise = this.services('Notes/List', data, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    create (req, res) {
        const promise = this.services('Notes/Create', req.body, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    update (req, res) {
        const data = {
            text: req.body.text,
            id: req.params.id,
            tagsIDs: req.body.tagsIDs
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
    changeStatus (req, res) {
        const data = {
            id: req.params.id,
            status: req.params.action
        }
        const promise = this.services('Notes/ChangeStatus', data, req.signedCookies.id);
        this.renderPromise(promise, res);
    }
}

module.exports = Notes;