var notes          = [];  //массив с заметками
var notesList      = document.getElementById('notesList'); //найти див для расположения заметок
var newNoteInput   = document.getElementById('newNoteInput'); // найти текстареа для ввода текста новой заметки

API.list().then(function(notesFromServer) {
    for (var i = 0; i < notesFromServer.count; i++) {
        var resivedFromServerNote  = notesFromServer.data[i];
        var newNoteContainer       = showNote(resivedFromServerNote); //создание дива с текстом и датой заметки из массива
        notesList.appendChild(newNoteContainer);
    }; //цикл который запихивает заметки из массива в дивы

    notes = notes.concat(notesFromServer.data);
    console.log(notes);
});

document.getElementById('addButton').onclick = function() {
    var note = {
        text: newNoteInput.value,
    };

    API.create(note).then(function(noteFromServer) {
        var newNoteContainer = showNote(noteFromServer); //создание дива с текстом и датой только что введенной заметки
        notesList.insertBefore(newNoteContainer, notesList.firstChild); //1 аргумент - что вставлять, 2ой - куда
        notes.push(noteFromServer); //впихивание нового объекта в массив
        console.log(noteFromServer);
    });
};

function dateFormat(date) {
    return date.getDate()+ "."  +
    (date.getMonth() +1) + "."  +
    date.getFullYear()   + ", " +
    date.getHours()      + ":"  +
    date.getMinutes()    + ":"  +
    date.getSeconds();
}

function showNote(note) {
    var newNoteContainer   = document.createElement('div'); //создание нового дива в виде объекта
    var newTextArea        = document.createElement('textarea');
    var newDateContainer   = document.createElement('div');
    newTextArea.dataset.id = note.id;

    newTextArea.onblur     = function() {
        API.update({id: this.dataset.id, text: this.value}).then(function(noteFromServer) {
            newDateContainer.innerHTML = dateFormat(noteFromServer.date);
        })
    }

    newNoteContainer.appendChild(newTextArea);
    newNoteContainer.appendChild(newDateContainer);
    newNoteContainer.className = 'note-container'; //свойства объекта
    newDateContainer.className = "date";
    newTextArea.innerHTML      = note.text; //свойствo объекта
    newDateContainer.innerHTML = dateFormat(note.date);

    return newNoteContainer;
}
