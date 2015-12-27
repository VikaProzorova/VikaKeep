var db     = require('mysql-promise')();
var bcrypt = require('bcrypt-nodejs');


function Storage(user) {
    this.user = user;
};

Storage.getDB = function() {
    return db;
}

Storage.prototype = {
    getNotesList: function() {
        return db.query('SELECT * FROM notes WHERE user = ? AND isDeleted = 0 ORDER BY id DESC', [this.user.id])
        .spread(function(notesFromDB) {
            return notesFromDB;
        });
    },
    createNote: function(note) {
        note.date = new Date();
        return db.query('INSERT INTO notes (text, date, user) VALUES (?, ?, ?)', [note.text, note.date, this.user.id])
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
    loginUser: function(user) {
        return db.query('SELECT * FROM users WHERE email = ?', [user.email])
        .spread(function(usersFromDB) {
            var foundUser = usersFromDB[0];
            if (!foundUser) {
                throw "User not exist";
            }

            var isValidPassword = bcrypt.compareSync(user.password + foundUser.salt, foundUser.password);
            if (!isValidPassword) {
                throw "Wrong password";
            }

            return {
                id: foundUser.id,
                name: user.name,
                email: user.email
            };
        });
    },
    registerUser: function(user) {
        var salt = bcrypt.genSaltSync();
        var hash = bcrypt.hashSync(user.password + salt);

        return db.query('INSERT INTO users (email, password, salt, name) VALUES (?, ?, ?, ?)', [user.email, hash, salt, user.name])
        .spread(function() {
            return {
                name:  user.name,
                email: user.email
            };
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
    },
    showUser: function(user) {
        return db.query('SELECT * FROM users WHERE id = ?', [user.id])
        .spread(function(usersFromDB) {
            var foundUser = usersFromDB[0];
            if (!foundUser) {
                throw "User not exist";
            }
            return {
                name:  foundUser.name,
                email: foundUser.email
            };
        });
    },
    updateUser: function(user) {
        return db.query('UPDATE users SET email = ?, name = ? WHERE id = ?', [user.email, user.name, this.user.id])
        .catch(function(error) {
            console.log(error);
            if (error.code == 'ER_BAD_NULL_ERROR') {
                throw "All fields are required";
            }
            if (error.code == 'ER_DUP_ENTRY') {
                throw "Email already exist";
            }
            throw "UNKNOWN ERROR";
        })
        .spread(function(){
            return {
                name:  user.name,
                email: user.email
            };
        });
    },
    changePasswordUser: function(user) {
        return db.query('SELECT * FROM users WHERE id = ?', [this.user.id])
        .spread(function(usersFromDB) {
            var foundUser = usersFromDB[0];
            var isValidPassword = bcrypt.compareSync(user.oldPassword + foundUser.salt, foundUser.password);
            if (!isValidPassword) {
                throw "Wrong password";
            }
            return foundUser;
        })
        .then(function(foundUser) {
            var salt = bcrypt.genSaltSync();
            var hash = bcrypt.hashSync(user.newPassword + salt);

            return db.query('UPDATE users SET password = ?, salt = ? WHERE id = ?', [hash, salt, foundUser.id])
            .then(function(){
                return foundUser;
            })
            .catch(function(error) {
                console.log(error);
                if (error.code == 'ER_BAD_NULL_ERROR') {
                    throw "All fields are required";
                }
                throw "UNKNOWN ERROR";
            })
        })
        .then(function(foundUser) {
            return {
                name:  foundUser.name,
                email: foundUser.email
            };
        });
    }

}

module.exports = function(params) {
    db.configure(params.config);
    return Storage;
};