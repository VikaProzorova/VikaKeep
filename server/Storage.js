const db = require('mysql-promise')();
const bcrypt = require('bcrypt');

class Storage {
    constructor(user) {
        this.user = user;
    }
    getNotesList(filter) {
        let sql = ''
        if(filter.tagID) {
            sql = [
                'SELECT * FROM notes',
                'JOIN notesTagsMap ON (notes.id = notesTagsMap.noteID)',
                'WHERE user = ? AND isDeleted = 0 AND tagID = ?',
                'ORDER BY id DESC'
            ].join(' ')
        }
        else {
            sql = [
                'SELECT * FROM notes',
                'WHERE user = ? AND isDeleted = 0',
                'ORDER BY id DESC'
            ].join(' ')
        }
        return db.query(sql, [this.user.id, filter.tagID])
        .then(([notesFromDB]) => {
            if (!notesFromDB.length) {
                return notesFromDB
            }

            const notesIDs = notesFromDB.map(note => note.id)

            return db.query('SELECT * FROM notesTagsMap WHERE noteID IN (?)', [notesIDs])
            .then(([mappedTags]) => {
                const notes = notesFromDB.map(note => {
                    note.tagsIDs = []

                    mappedTags.map(bunch => {
                        if (note.id == bunch.noteID) {
                            note.tagsIDs = [...note.tagsIDs, bunch.tagID]
                        }
                    })

                    return note
                })
                return notes
            })
        })
    }

    createNote(note) {
        note.date = new Date();
        return db.query('INSERT INTO notes (text, date, user) VALUES (?, ?, ?)', [note.text, note.date, this.user.id])
        .then(([queryStatus]) => {
            note.id = queryStatus.insertId;

            const mappedTags = note.tagsIDs.map(tagID => {
                return [tagID, note.id]
            })
            if (mappedTags.length) {
                return db.query('INSERT INTO notesTagsMap (tagID, noteID) VALUES ?', [mappedTags])
                .then(() => note)
            }
            return note
        })
    }
    updateNote(newNoteData) {
        newNoteData.date = new Date();
        return db.query('UPDATE notes SET text = ?, date = ? WHERE id = ?', [newNoteData.text, newNoteData.date, newNoteData.id])
        .then(() => db.query('DELETE FROM notesTagsMap WHERE noteID = ?', [newNoteData.id]))
        .then(() => {
            const mappedTags = newNoteData.tagsIDs.map(tagID => {
                return [tagID, newNoteData.id]
            })
            if (mappedTags.length) {
                return db.query('INSERT INTO notesTagsMap (tagID, noteID) VALUES ?', [mappedTags])
                .then(() => newNoteData);
            }
        })
        .then(() => newNoteData);
    }
    deleteNote(note) {
        return db.query('UPDATE notes SET isDeleted = true WHERE id = ?', [note.id]);
    }
    getTagsList() {
        return db.query('SELECT * FROM tags')
        .then(([tags]) => tags)
    }
    createTag(tag) {
        return db.query('INSERT INTO tags (name) VALUES (?)', [tag.name])
        .then(([queryStatus]) => {
            tag.id = queryStatus.insertId;
            return tag
        })
    }
    updateTag(tag) {
        return db.query('UPDATE tags SET name = ? WHERE id = ?', [tag.name, tag.id])
        .then (() => tag)
    }
    deleteTag(tag) {
        return db.query('DELETE FROM notesTagsMap WHERE tagID = ?', [tag.id])
        .then(() => db.query('DELETE FROM tags WHERE id = ?', [tag.id]))
    }
    loginUser(user) {
        return db.query('SELECT * FROM users WHERE email = ?', [user.email])
        .then(([[foundUser]]) => {
            if (!foundUser) {
                throw "User not exist";
            }

            return bcrypt.compare(user.password, foundUser.password)
            .then(isValidPassword => {
                if (!isValidPassword) {
                    throw "Wrong password";
                }

                return {
                    id: foundUser.id,
                    name: user.name,
                    email: user.email
                };
            })
        })
    }
    registerUser(user) {
        return bcrypt.hash(user.password, 10)
        .then((hash) => {
            return db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [user.email, hash, user.name])
        })
        .then(() => {
            return {
                name: user.name,
                email: user.email
            };
        })
        .catch((error) => {
            console.log(error);
            if (error.code == 'ER_DUP_ENTRY') {
                throw "Email already exist";
            }
            throw "UNKNOWN ERROR";
        });
    }
    showUser(user) {
        return db.query('SELECT * FROM users WHERE id = ?', [user.id])
        .then(([[foundUser]]) => {
            if (!foundUser) {
                throw "User not exist";
            }
            return {
                name: foundUser.name,
                email: foundUser.email
            };
        });
    }
    updateUser(user) {
        return db.query('UPDATE users SET email = ?, name = ? WHERE id = ?', [user.email, user.name, this.user.id])
        .catch((error) => {
            console.log(error);
            if (error.code == 'ER_BAD_NULL_ERROR') {
                throw "All fields are required";
            }
            if (error.code == 'ER_DUP_ENTRY') {
                throw "Email already exist";
            }
            throw "UNKNOWN ERROR";
        })
        .then(() => {
            return {
                name: user.name,
                email: user.email
            };
        });
    }
    changePasswordUser(user) {
        return db.query('SELECT * FROM users WHERE id = ?', [this.user.id])
        .then(([[foundUser]]) => {
            return bcrypt.compare(user.oldPassword, foundUser.password)
            .then(isValidPassword => {
                if (!isValidPassword) {
                    throw "Wrong password";
                }
                return foundUser;
            })
        })
        .then((foundUser) => {
            return bcrypt.hash(user.newPassword, 10)
            .then(hash => db.query('UPDATE users SET password = ? WHERE id = ?', [hash, foundUser.id]) )
            .then(() => {
                return {
                    name: foundUser.name,
                    email: foundUser.email
                };
            });
        })
    }

    static getDB() {
        return db;
    }
};

module.exports = function(params) {
    db.configure(params.config);
    return Storage;
};