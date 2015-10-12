var util = require('util');
var Base = require('./Base');

function Notes (config, services) {
    Notes.super_.call(this, config, services);
};

util.inherits(Notes, Base);

Notes.prototype.list   = function(req, res) {
    var promise = this.services('Notes/List', {}, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Notes.prototype.create = function(req, res) {
    var promise = this.services('Notes/Create', req.body, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Notes.prototype.update = function(req, res) {
    var data = {
        text: req.body.text,
        id:   req.params.id
    }
    var promise = this.services('Notes/Update', data, req.signedCookies.id);
    this.renderPromise(promise, res);
}

Notes.prototype.delete = function(req, res) {
    var data = {
        id:   req.params.id
    }
    var promise = this.services('Notes/Delete', data, req.signedCookies.id);
    this.renderPromise(promise, res);
}

module.exports = Notes;