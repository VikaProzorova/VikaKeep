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
            errorMessage:'',
            tags:[],
            choosedTagsIDs:[]
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
                const err = JSON.stringify(error)
                this.setState({
                    errorMessage: "Some bullshit! " + err
                })
            }
        });

        API.tags.list()
        .then(tags => {
            this.setState({
                tags: tags
            })
        })
    }

    updateNewNote(event) {
        this.setState({
            newNote: event.target.value
        });
    }

    handleAddNewNote() {
        const newNote = {
            text: this.state.newNote,
            tagsIDs: this.state.choosedTagsIDs
        }

        if (newNote.text != '') {
            API.notes.create(newNote)
            .then(noteFromServer => {
                this.setState({
                    notes: [noteFromServer, ...this.state.notes],
                    newNote: '',
                    choosedTagsIDs:[]
                })
            })
        }
    }

    updateNote(id) {
        return (event) => {
            this.setState({
                notes: this.state.notes.map(note => {
                    if (note.id == id) {
                        return Object.assign({}, note, {text: event.target.value, date: new Date()})
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

    handleToogleTag(tagID) {
        return (event) => {
            if (this.state.choosedTagsIDs.includes(tagID)) {
                return this.setState({
                    choosedTagsIDs: this.state.choosedTagsIDs.filter(id => id != tagID)
                })
            }

            this.setState({
                choosedTagsIDs: [...this.state.choosedTagsIDs, tagID]
            })
        }
    }

    getButtonStyle(tagID) {
        let buttonStyle = "info"
        if (this.state.choosedTagsIDs.includes(tagID)) {
            buttonStyle = "success"
        }
        return buttonStyle
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
                        style={{maxWidth: "100%"}}
                        componentClass="textarea"
                        type="text"
                        value={note.text}
                        onChange={this.updateNote(note.id)}
                        onBlur={this.sendUpdatedNote(note.id)}
                    />
                </Panel>
            )
        })

        const tagsButtons = this.state.tags.map(tag => {
            return <Button
                key={tag.id+tag.name}
                bsStyle={this.getButtonStyle(tag.id)}
                onClick={this.handleToogleTag(tag.id)}>
                {tag.name}
            </Button>
        })

        const myFooter = <div>
            {tagsButtons}
            <Button
                bsStyle='primary'
                style={{float:"right"}}
                onClick={this.handleAddNewNote.bind(this)}>
                Save
            </Button>
            <br/>
            <br/>
        </div>

        return(
            <Jumbotron>
                <PageHeader> VikaKeep Notes Page <br/> <small> Notes </small> </PageHeader>
                <Alert style="warning">{this.state.errorMessage}</Alert>
                <Panel footer={myFooter}>
                    <FormControl
                        style={{maxWidth: "100%"}}
                        componentClass="textarea"
                        type="text"
                        placeholder="New note"
                        value={this.state.newNote}
                        onChange={this.updateNewNote.bind(this)}
                    />
                </Panel>
                <div> {notesList} </div>
            </Jumbotron>
        )
    }
}
export default withRouter(Notes);
