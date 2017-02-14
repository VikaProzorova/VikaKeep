function query (path, method, body) {
    const params = {
        method: method,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "same-origin"
    }

    if (body) {
        params.body = JSON.stringify(body)
    }

    return fetch("/api/" + path, params)
    .then(response => response.json())
    .then(response => {
        if(!response.status) {
            throw response.error;
        }
        return response.data;
    })
}

const notes = {
    list() {
        return query("notes", "get")
        .then(data => {
            return data.map(note => {
                note.date = new Date(note.date);
                return note
            });
        });
    },
    create(note) {
        return query("notes", "post", note)
        .then(note => {
            note.date = new Date(note.date);
            return note;
        });
    },
    update(note) {
        return query(`notes/${note.id}`, "post", {text: note.text, tagsIDs: note.tagsIDs})
        .then(note => {
            note.date = new Date(note.date);
            return note;
        });
    },
    delete(noteID) {
        return query(`notes/${noteID}`, "delete")
    }
};

const users = {
    login(user) {
        return query("users/login", "post", user)
    },
    register(user) {
        return query("users/registration", "post", user)
    },
    logout() {
        return query("users/logout", "post")
    },
    show(user) {
        return query("users/current", "get", user)
    },
    update(user) {
        return query("users/current", "post", user)
    },
    changePassword(user) {
        return query("users/current/password", "post", user)
    }
};

const tags = {
    list() {
        return query("tags", "get")
    }
}
module.exports = {
    notes,
    users,
    tags
};
