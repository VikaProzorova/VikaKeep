const Base = require('./Base');

class Users extends Base {
    registration (req, res) {
        const promise = this.services('Users/Registration', req.body, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    login (req, res) {
        const promise = this.services('Users/Login', req.body, req.signedCookies.id)
        .then(user => {
            res.cookie("id", user.data.id, {signed: true, httpOnly: false});
            return user;
        })
        this.renderPromise(promise, res);
    }

    show (req, res) {
        const promise = this.services('Users/Show', {}, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    update (req, res) {
        const promise = this.services('Users/Update', req.body, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    changePassword (req, res) {
        const promise = this.services('Users/ChangePassword', req.body, req.signedCookies.id);
        this.renderPromise(promise, res);
    }

    logout (req, res) {
        res.clearCookie("id");
        res.send({
            status: 1
        });
    }
}

module.exports = Users;