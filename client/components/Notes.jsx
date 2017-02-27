import React from 'react';
import moment from 'moment';
import { Jumbotron, PageHeader, Badge, Button, FormControl, Glyphicon, FormGroup, Panel, ButtonGroup } from 'react-bootstrap';
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
            newNoteTagsIDs:[]
        }
    }

    componentWillMount() {
        API.notes.list()
        .then(data => {
            this.setState({
                notes: data
            })
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
            tagsIDs: this.state.newNoteTagsIDs
        }

        if (newNote.text != '') {
            API.notes.create(newNote)
            .then(noteFromServer => {
                this.setState({
                    notes: [noteFromServer, ...this.state.notes],
                    newNote: '',
                    newNoteTagsIDs:[]
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
        const tagsIDs = this.state.notes.find(note => note.id == id).tagsIDs
        return (event) => {
            API.notes.update({id: id, text: event.target.value, tagsIDs: tagsIDs})
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
            if (this.state.newNoteTagsIDs.includes(tagID)) {
                return this.setState({
                    newNoteTagsIDs: this.state.newNoteTagsIDs.filter(id => id != tagID)
                })
            }

            this.setState({
                newNoteTagsIDs: [...this.state.newNoteTagsIDs, tagID]
            })
        }
    }

    handleUpdateTag(tagID, noteID) {
        return (event) => {
            const note = this.state.notes.find(note => note.id == noteID)

            if (note.tagsIDs.includes(tagID)) {
                note.tagsIDs = note.tagsIDs.filter(id => id != tagID)
            } else {
                note.tagsIDs = [ ...note.tagsIDs, tagID ]
            }

            this.forceUpdate()

            API.notes.update(note)
        }
    }

    getButtonStyle(tagID) {
        let buttonStyle = "info"
        if (this.state.newNoteTagsIDs.includes(tagID)) {
            buttonStyle = "success"
        }
        return buttonStyle
    }

    getTagsButtons(tagsIDs, noteID) {
        if (!this.state.tags.length) {
            return
        }
        return tagsIDs.map(tagID => {
            const tagName = this.state.tags.find(tag => tag.id == tagID).name

            return <ButtonGroup>
                <Button
                    key={"note delete tag" + tagName + noteID}
                    bsStyle="info"
                    bsSize="xsmall"
                    onClick={this.handleUpdateTag(tagID, noteID)}
                >
                    <Glyphicon glyph='minus' />
                </Button>
                <Button
                    key={"note sorting tag" + tagName + noteID}
                    bsStyle="info"
                    bsSize="xsmall"
                    >
                    {tagName}
                </Button>
            </ButtonGroup>
        })
    }
    getOtherTagsButtons(note) {
        if (!this.state.tags.length) {
            return
        }
        const otherTags = this.state.tags.filter(tag => {
            return !note.tagsIDs.includes(tag.id)
        })

        return otherTags.map(tag => {
            return <div> <ButtonGroup>
                <Button
                    key={"note toogle tag" + tag.id + note.id}
                    bsStyle="warning"
                    bsSize="xsmall"
                    onClick={this.handleUpdateTag(tag.id, note.id)}
                >
                    <Glyphicon glyph='plus' />
                </Button>
                <Button
                    key={"note sort tag" + tag.id + note.id}
                    bsStyle="warning"
                    bsSize="xsmall"
                >
                    {tag.name}
                </Button>
            </ButtonGroup> </div>

        })
    }

    render() {
        const notesList = this.state.notes.map(note => {
            const title = <div>
                {moment(note.date).toNow()}
                <br/>
                {this.getTagsButtons(note.tagsIDs, note.id)}
                <Glyphicon glyph='trash' style={{float: 'right'}} onClick={this.deleteNote(note.id)}/>
            </div>
            const noteFooter = <div> {this.getOtherTagsButtons(note)} </div>

            return (
                <Panel key={note.id} header={title} footer={noteFooter}>
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

        const newNoteFooter = <div>
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
                <Panel footer={newNoteFooter}>
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
