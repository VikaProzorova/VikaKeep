var util = require('util');
var Base = require('./Base');

function Users (config, services) {
    Users.super_.call(this, config, services);
};

util.inherits(Users, Base);


Users.prototype.registration = function(req, res) {
    var promise = this.services('Users/Registration', req.body, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Users.prototype.login = function(req, res) {
    var promise = this.services('Users/Login', req.body, req.signedCookies.id)
    .then(function(user) {
        res.cookie("id", user.data.id, {signed: true, httpOnly: false});
        return user;
    })
    this.renderPromise(promise, res);
}

Users.prototype.show = function(req, res) {
    var promise = this.services('Users/Show', {}, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Users.prototype.update = function(req, res) {
    var promise = this.services('Users/Update', req.body, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Users.prototype.changePassword = function(req, res) {
    var promise = this.services('Users/ChangePassword', req.body, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Users.prototype.logout = function(req, res) {
    res.clearCookie("id");
    res.send({
        status: 1
    });
}

module.exports = Users;