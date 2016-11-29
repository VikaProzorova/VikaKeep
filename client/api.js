const notes = {
    list() {
        return fetch("/api/notes", {
            method: "get",
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(response => {
            if(!response.status) {
                throw response.error;
            }
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].date = new Date(response.data[i].date);
            }
            return response;
        });
    },
    create(note) {
        return fetch("/api/notes", {
            method:  "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify(note),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(resivedFromServerNote => {
            let noteFromServer  = resivedFromServerNote.data;
            noteFromServer.date = new Date(noteFromServer.date);
            return noteFromServer;
        });
    },
    update(note) {
        return fetch("/api/notes/" + note.id, {
            method:  "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify({text: note.text}),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(resivedFromServerNote => {
            let noteFromServer  = resivedFromServerNote.data;
            noteFromServer.date = new Date(noteFromServer.date);
            return noteFromServer;
        });
    },
    delete(noteID) {
        return fetch("/api/notes/" + noteID, {
            method:  "delete",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            credentials: "same-origin"
        })
        .then(response => response.json());
    }
};

const users = {
    login(user) {
        return fetch("/api/users/login", {
            method:  "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify(user),
            credentials: "same-origin"
        })
        .then(response => response.json());
    },
    register(user) {
        return fetch("/api/users/registration", {
            method:  "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify(user),
            credentials: "same-origin"
        })
        .then(response => response.json());
    },
    logout() {
        return fetch("/api/users/logout", {
            method:  "post",
            credentials: "same-origin"
        })
        .then(response => response.json());
    },
    show(user) {
        return fetch("/api/users/current", {
            method: "get",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify(user),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(userFromServer => {
            let user = userFromServer.data;
            return user;
        });
    },
    update(user) {
        return fetch("/api/users/current", {
            method: "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify(user),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(userFromServer => {
            if (!userFromServer.status) {
                throw userFromServer.error;
            }
            return userFromServer.data;
        });
    },
    changePassword(user) {
        return fetch("/api/users/current/password", {
            method: "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:    JSON.stringify(user),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(userFromServer => {
            if (!userFromServer.status) {
                throw userFromServer.error;
            }
            return userFromServer.data;
        });
    }
};

module.exports = {
    notes,
    users
};
