import React from 'react';
import moment from 'moment';
import { Jumbotron, PageHeader, Badge, Button, FormControl, Glyphicon, FormGroup, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";
import Alert from "./Alert.jsx";

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            newNote: '',
            errorMessage:''
        }
    }

    componentWillMount() {
        API.notes.list()
        .then(data => {
            this.setState({ notes: data })
        })
        .catch((error) => {
            if (error == "Permission denied") {
                this.props.router.push({ pathname: '/login' });
            }
            else {
                this.setState({
                    errorMessage: "Some bullshit! " + error
                })
            }
        });
    }

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
    sendUpdatedNote(id) {
        return (event) => {
            API.notes.update({id: id, text: event.target.value})
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
            const title = <div>
                {moment(note.date).toNow()}
                <Glyphicon glyph='trash' style={{float: 'right'}} onClick={this.deleteNote(note.id)}/>

            </div>
            return (
                <Panel key={note.id} header={title} >
                    <FormControl
                        componentClass="textarea"
                        type="text"
                        value={note.text}
                        onChange={this.updateNote(note.id)}
                        onBlur={this.sendUpdatedNote(note.id)}
                    />
                </Panel>
            )
        });
        return(
            <Jumbotron>
                <PageHeader> VikaKeep Notes Page <br/> <small> Notes </small> </PageHeader>
                <Alert style="warning">{this.state.errorMessage}</Alert>
                <FormGroup>
                    <FormControl
                        componentClass="textarea"
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
