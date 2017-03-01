function query (path, method, body) {
    const params = {
        method: method,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "same-origin"
    }

    if (body) {
        if(method == 'get') {
            path += '?' + Object.keys(body).map(key => key + '=' + body[key]).join('&')
        } else {
            params.body = JSON.stringify(body)
        }
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
    list(tagFilter) {
        console.log(tagFilter)

        return query("notes", "get", tagFilter)
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
    show() {
        return query("users/current", "get")
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
    },
    create(tag) {
        return query("tags", "post", tag)
    },
    update(tag) {
        return query(`tags/${tag.id}`, "post", tag)
    },
    delete(tagID) {
        return query(`tags/${tagID}`, "delete")
    }
}
module.exports = {
    notes,
    users,
    tags
};
