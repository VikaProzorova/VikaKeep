import React from 'react';
import moment from 'moment';
import { Grid, Row, Col, Badge, Button, FormControl, Glyphicon, FormGroup, Panel, ButtonGroup } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";
import Alert from "./Alert.jsx";

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            newNote: '',
            errorMessage: '',
            tags: [],
            newNoteTagsIDs: [],
            tagFilters: {},
            statusFilters: {}
        }
    }

    componentWillMount() {
        this.getNotes()
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
                        return Object.assign({}, note, {text: event.target.value})
                    }
                    return note;
                })
            })
        }
    }

    sendUpdatedNote(id) {
        const tagsIDs = this.state.notes.find(note => note.id == id).tagsIDs
        return (event) => {
            this.setState({
                notes: this.state.notes.map(note => {
                    if (note.id == id) {
                        return Object.assign({}, note, {date: new Date()})
                    }
                    return note;
                })
            })
            API.notes.update({id: id, text: event.target.value, tagsIDs: tagsIDs})
        }
    }

    changeStatusInNote(id, newStatus) {
        return (event) => {
            this.setState({
                notes: this.state.notes.map(note => {
                    if (note.id == id) {
                        return Object.assign({}, note, {status: newStatus, date: new Date()})
                    }
                    return note;
                })
            })
            API.notes.changeStatus(id, newStatus)
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
            return <ButtonGroup key={'getTagsButtons:' + tagID}>
                <Button
                    key={"note_delete_tag" + tagName + noteID}
                    bsStyle="info"
                    bsSize="xsmall"
                    onClick={this.handleUpdateTag(tagID, noteID)}
                >
                    <Glyphicon glyph='minus' />
                </Button>
                <Button
                    key={"note_sorting_tag" + tagName + noteID}
                    bsStyle="info"
                    bsSize="xsmall"
                    >
                    {tagName}
                </Button>
                <Button
                    key={"note_sorting_tag_?" + tagName + noteID}
                    bsStyle="info"
                    bsSize="xsmall"
                    onClick={this.getFilteredNotes({tag: tagID})}
                >
                    <Glyphicon glyph={this.state.tagFilters[tagID] ? "minus" : "plus"}  />
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
            return <div key={'getOtherTagsButtons:' + tag.id}> <ButtonGroup>
                <Button
                    key={"note_toogle_tag" + tag.id + note.id}
                    bsStyle="warning"
                    bsSize="xsmall"
                    onClick={this.handleUpdateTag(tag.id, note.id)}
                >
                    <Glyphicon glyph='plus' />
                </Button>
                <Button
                    key={"note_sort_tag" + tag.id + note.id}
                    bsStyle="warning"
                    bsSize="xsmall"
                >
                    {tag.name}
                </Button>
                <Button
                    key={"note_sort_tag_plus" + tag.id + note.id}
                    bsStyle="warning"
                    bsSize="xsmall"
                    onClick={this.getFilteredNotes({tag: tag.id})}
                >
                    <Glyphicon glyph={this.state.tagFilters[tag.id] ? "minus" : "plus"} />
                </Button>
            </ButtonGroup> </div>
        })
    }

    getStatusesButtons(status, text){
        return <ButtonGroup>
            <Button
                key={"notes_button_filter"+ status}
                onClick={this.getFilteredNotes({status: status})}
            >
                <Glyphicon glyph={this.state.statusFilters[status] ? "minus" : "plus"} />
            </Button>
            <Button> {text} </Button>
        </ButtonGroup>
    }

    getNotes() {
        const filter = {
            tags: Object.keys(this.state.tagFilters),
            statuses: Object.keys(this.state.statusFilters)
        }
        API.notes.list(filter)
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

    getFilteredNotes(filter) {
        return (event) => {
            const newTags = this.state.tagFilters
            const newStatuses = this.state.statusFilters

            if (filter.tag) {
                if(newTags[filter.tag]) {
                    delete newTags[filter.tag]
                } else {
                    newTags[filter.tag] = true
                }
            }
            if (filter.status) {
                if(newStatuses[filter.status]) {
                    delete newStatuses[filter.status]
                } else {
                    newStatuses[filter.status] = true
                }
            }

            this.setState({
               tagFilters: newTags,
               statusFilters: newStatuses
            }, () => {
               this.getNotes()
            })
        }
    }

    render() {
        const notesList = this.state.notes.map(note => {
            const title = <div>
                {moment(note.date).toNow()}
                {this.getTagsButtons(note.tagsIDs, note.id)}
                <Glyphicon
                    glyph='trash'
                    style={{float: 'right'}}
                    onClick={this.changeStatusInNote(note.id, 'DELETED')}
                />
                <Glyphicon
                    glyph='check'
                    style={{float: 'right'}}
                    onClick={this.changeStatusInNote(note.id, 'DONE')}
                />
                <Glyphicon
                    glyph='play'
                    style={{float: 'right'}}
                    onClick={this.changeStatusInNote(note.id, 'IN_PROGRESS')}
                />
            </div>

            const noteFooter = <div> {this.getOtherTagsButtons(note)} Status: {note.status}</div>

            return (
                <Panel key={"Panel" + note.id} header={title} footer={noteFooter}>
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
            <Grid>
                <Row className="show-grid" style={{"padding":"50"}}>
                    <Col xs={6} md={2}><code>
                        <div>
                            Filter by statuses
                            <br/>{this.getStatusesButtons('NEW', "New")}
                            <br/>{this.getStatusesButtons('IN_PROGRESS', "In progress")}
                            <br/>{this.getStatusesButtons('DONE', "Done")}
                            <br/>{this.getStatusesButtons('DELETED', "Deleted")}
                        </div>
                    </code></Col>
                    <Col xs={12} md={10}><code>
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
                    </code></Col>
                </Row>
            </Grid>
        )
    }
}
export default withRouter(Notes);
