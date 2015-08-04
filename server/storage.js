var db     = require('mysql-promise')();
var config = require('./config');
db.configure(config.db);

var storage = {
    getNotesList: function() {
        return db.query('SELECT * FROM notes WHERE isDeleted = 0 ORDER BY id DESC')
        .spread(function(notesFromDB) {
            return notesFromDB;
        });
    },
    createNote: function(note) {
        note.date = new Date();
        return db.query('INSERT INTO notes (text, date, user) VALUES (?, ?, ?)', [note.text, note.date, note.user])
        .spread(function(queryStatus) {
            note.id = queryStatus.insertId;
            return note;
        });
    },
    updateNote: function(newNoteData) {
        newNoteData.date = new Date();
        return db.query('UPDATE notes SET text = ?, date = ? WHERE id = ?', [newNoteData.text, newNoteData.date, newNoteData.id])
        .spread(function() {
            return newNoteData;
        });
    },
    deleteNote: function(note) {
        return db.query('UPDATE notes SET isDeleted = true WHERE id = ?', [note.id])
    },
    createUser: function(user) {
        return db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [user.email, user.password, user.name])
        .then(function() {
            return user;
        });
    },
    loginUser: function(user) {
        return db.query('SELECT * FROM users WHERE email = ? AND password = ?', [user.email, user.password])
        .spread(function(usersFromDB) {
            var user = usersFromDB[0];
            if (!user) {
                throw "Wrong email or password"
            }
            return user;
        });
    },
    registerUser: function(user) {
        return db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [user.email, user.password, user.name])
        .spread(function() {
            return user;
        })
        .catch(function(error) {
            console.log(error);
            if (error.code == 'ER_BAD_NULL_ERROR') {
                throw "All fields are required";
            }
            if (error.code == 'ER_DUP_ENTRY') {
                throw "Email already exist";
            }
            throw "UNKNOWN ERROR";
        });
    }
}


module.exports = storage;