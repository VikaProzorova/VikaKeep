import React from 'react';
import moment from 'moment';
import { Jumbotron, PageHeader, Button, FormControl, Glyphicon, FormGroup } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    componentWillMount() {
        API.notes.list()
        .then(({data}) => {
            this.setState({ notes: data })
        })
        .catch((error) => {
            if (error == "Permission denied") {
                this.props.router.push({ pathname: '/login' });
                return;
            }

            alert("Some bullshit! " + error);
        });
    }

    // updateNote(event) {
    //     this.setState({
    //         note: event.target.value
    //     });

    //     newTextArea.onblur = () => {
    //         API.notes.update({id: note.id, text: newTextArea.value})
    //         .then(noteFromServer => newDateContainer.innerHTML = moment(noteFromServer.date).toNow());
    //     };
    // }

    // createNote() {
    //     document.getElementById("addButton").onclick = () => {
    //         const note = {text: newNoteInput.value};

    //         API.notes.create(note)
    //         .then(noteFromServer => {
    //             let newNoteContainer = showNote(noteFromServer);
    //             notesList.insertBefore(newNoteContainer, notesList.firstChild);
    //             newNoteInput.value = "";
    //         });
    //     };
    // }

    // showNote() {
    //     const newNoteContainer = document.createElement("div");
    //     const newTextArea      = document.createElement("textarea");
    //     const deleteButton     = document.createElement("div");
    //     const newDateContainer = document.createElement("div");

    //     newNoteContainer.appendChild(newTextArea);
    //     newNoteContainer.appendChild(newDateContainer);
    //     newNoteContainer.appendChild(deleteButton);

    //     newNoteContainer.className = "panel panel-default";
    //     newTextArea.className      = "panel-body form-control form-group";
    //     newDateContainer.className = "panel-title";
    //     deleteButton.className     = "glyphicon glyphicon-trash";

    //     newTextArea.innerHTML      = note.text;
    //     newDateContainer.innerHTML = moment(note.date).toNow();

    //     return newNoteContainer;
    // }
    updateNewNote(event) {
        this.setState({
            newNote: event.target.value
        });
    }

    handleAddNewNote() {
        const newNote = {
            text: this.state.newNote
        }

        if (newNote.text != '') {
            API.notes.create(newNote)
            .then(noteFromServer => {
                this.setState({
                    notes: [noteFromServer, ...this.state.notes],
                    newNote: ''
                })
            })
        }
    }

    updateNote(id) {
        return (event) => {
            this.setState({
                notes: this.state.notes.map(note => {
                    if (note.id == id) {
                        return Object.assign({}, note, {text: event.target.value})
                    }
                    return note;
                })
            })
        }
    }

    deleteNote(id) {
        return (event) => {
            API.notes.delete(id)
            .then(() => {
                this.setState({
                    notes: this.state.notes.filter(note => note.id != id)
                })
            })
        }
    }

    render() {
        const notesList = this.state.notes.map(note => {
            return (
                <FormGroup key={note.id}>
                    <FormControl
                        type="text"
                        value={note.text}
                        onChange={this.updateNote(note.id)}
                    />
                    <Glyphicon glyph='trash' onClick={this.deleteNote(note.id)}/>
                </FormGroup>
            )
        });
        return(
            <Jumbotron>
                <PageHeader> VikaKeep Notes Page <br/> <small> Notes </small> </PageHeader>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="New note"
                            value={this.state.newNote}
                            onChange={this.updateNewNote.bind(this)}
                        />
                        <Button bsStyle='primary' onClick={this.handleAddNewNote.bind(this)}> Save </Button>
                    </FormGroup>
                <div> {notesList} </div>
            </Jumbotron>
        )
    }
}
export default withRouter(Notes);
