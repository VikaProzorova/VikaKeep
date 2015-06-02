var API = {
    create: function(note) {
        return fetch('/notes', {
            method: 'post',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(note)
        }).then(function(response) {
            return response.json().then(function(resivedFromServerNote) {
                var noteFromServer   = resivedFromServerNote.data
                noteFromServer.date  = new Date(noteFromServer.date);
                return noteFromServer;
            });
        });
    }
}

window.API = API;