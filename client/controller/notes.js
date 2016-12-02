"use strict";

const API    = require("../api.js");
const moment = require("moment");
const popup  = require("../popup.js");

function showNote(note) {
    const newNoteContainer = document.createElement("div");
    const newTextArea      = document.createElement("textarea");
    const deleteButton     = document.createElement("div");
    const newDateContainer = document.createElement("div");

    newTextArea.onblur = () => {
        API.notes.update({id: note.id, text: newTextArea.value})
        .then(noteFromServer => newDateContainer.innerHTML = moment(noteFromServer.date).toNow());
    };

    deleteButton.onclick = () => {
        API.notes.delete(note.id)
        .then(() => newNoteContainer.style.display = "none");
    };

    newNoteContainer.appendChild(newTextArea);
    newNoteContainer.appendChild(newDateContainer);
    newNoteContainer.appendChild(deleteButton);

    newNoteContainer.className = "panel panel-default";
    newTextArea.className      = "panel-body form-control form-group";
    newDateContainer.className = "panel-title";
    deleteButton.className     = "glyphicon glyphicon-trash";

    newTextArea.innerHTML      = note.text; 
    newDateContainer.innerHTML = moment(note.date).toNow();

    return newNoteContainer;
};

module.exports = (router) => {
    const notesList    = document.getElementById("notesList"); 
    const newNoteInput = document.getElementById("newNoteInput"); 


    API.notes.list()
    .then(allNotes => {
        for (let i = 0; i < allNotes.data.length; i++) {
            let note = allNotes.data[i];
            let newNoteContainer = showNote(note);
            notesList.appendChild(newNoteContainer);
        }
    })
    .catch((error) => {
        if (error == "Permission denied") {
            router.login();
            return;
        }

        popup.showPopup("Some bullshit! " + error);
    });

    document.getElementById("profileButton").onclick = () => router.profile();
    
    document.getElementById("logoutButton").onclick = () => {
        API.users.logout()
        .then(response => {
            if (response.status) {
               router.login();
            }
        });
    };

    document.getElementById("addButton").onclick = () => {
        const note = {text: newNoteInput.value};

        API.notes.create(note)
        .then(noteFromServer => {
            let newNoteContainer = showNote(noteFromServer); 
            notesList.insertBefore(newNoteContainer, notesList.firstChild); 
            newNoteInput.value = "";
        });
    };

};
