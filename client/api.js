var API = {
    create: function(note) {
        return fetch('/notes', {
            method: 'post',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(note)
        }).then(function(response) {
            return response.json().then(function(resivedFromServerNote) {
                var noteFromServer  = resivedFromServerNote.data
                noteFromServer.date = new Date(noteFromServer.date);
                return noteFromServer;
            });
        });
    },
    update: function(note) {
        return fetch('/notes/' + note.id, {
            method: 'post',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({text: note.text})
        }).then(function(response) {
            return response.json().then(function(resivedFromServerNote) {
                var noteFromServer  = resivedFromServerNote.data
                noteFromServer.date = new Date(noteFromServer.date);
                return noteFromServer;
            })
        });
    },
    list: function() {
        return fetch('/notes').then(
            function(response) {
                return response.json().then(function(resivedFromServerNotes) {
                    for (var i = 0; i < resivedFromServerNotes.count; i++) {
                        resivedFromServerNotes.data[i].date = new Date(resivedFromServerNotes.data[i].date);
                    }
                    return resivedFromServerNotes;
                })
            }
        )
    }
}

window.API = API;