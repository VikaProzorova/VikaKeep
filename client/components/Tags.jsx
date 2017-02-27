import React from 'react';
import { Jumbotron, PageHeader, Badge, Button, FormControl, Glyphicon, FormGroup, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            newTagName: ''
        }
    }

    componentWillMount() {
        API.tags.list()
        .then(tags => {
            this.setState({
                tags: tags
            })
        })
    }

    handleAddNewTag() {
        const newTag = {
            name: this.state.newTagName
        }

        if (newTag.name) {
            API.tags.create(newTag)
            .then(tag => {
                this.setState({
                    tags: [tag, ...this.state.tags],
                    newTagName:''
                })
            })
        }
    }

    updateNewTag(event) {
        this.setState({
            newTagName: event.target.value
        });

    }

    updateTag(id) {
        return (event) => {
            this.setState({
                tags: this.state.tags.map(tag => {
                    if (tag.id == id) {
                        return Object.assign({}, tag, {name: event.target.value})
                    }
                    return tag;
                })
            })
        }
    }

    sendUpdatedTag(id) {
        return (event) => {
            API.tags.update({id: id, name: event.target.value})
        }
    }

    deleteTad(id) {
        return (event) => {
            API.tags.delete(id)
            .then(() => {
                this.setState({
                    tags: this.state.tags.filter(tag => tag.id != id)
                })
            })
        }
    }

    render() {
        let tagsList =[]

        if(this.state.tags.length) {
            tagsList = this.state.tags.map(tag => {
                const title = <Glyphicon glyph='trash' style={{float: 'right'}} onClick={this.deleteTad(tag.id)}/>
                return( <Panel key={tag.id} header={title}>
                    <FormControl
                        key={tag.id}
                        style={{maxWidth: "100%"}}
                        componentClass="textarea"
                        type="text"
                        value={tag.name}
                        onChange={this.updateTag(tag.id)}
                        onBlur={this.sendUpdatedTag(tag.id)}
                    />
                    </Panel>
                )
            })
        }

        return(
            <Jumbotron>
                <PageHeader> VikaKeep Tags Page <br/> <small> Tags </small> </PageHeader>
                <FormControl
                    style={{maxWidth: "100%"}}
                    componentClass="textarea"
                    type="text"
                    placeholder="New tag"
                    value={this.state.newTagName}
                    onChange={this.updateNewTag.bind(this)}
                />
                <Button
                    bsStyle='primary'
                    onClick={this.handleAddNewTag.bind(this)}>
                    Save
                </Button>
                <div> {tagsList} </div>
            </Jumbotron>
        )
    }
}

export default withRouter(Tags);
