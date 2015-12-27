var supertest = require('supertest-as-promised');
var Promise   = require('bluebird');
var config    = require('../etc/config');
var server    = require('../server')(config);

var helper    = {
    dropDB: function() {
        var db = server.Storage.getDB();
        return Promise.all(['notes', 'users'].map(function(table) {
            return db.query('DROP table ?', [table])
        });
    },
    getClient: function() {
        return supertest.agent(server.app);
    }
}

module.exports = helper;