import React from 'react';
import { Glyphicon, Jumbotron, PageHeader, Button, InputGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password:''
        };
    }

    updateEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    updatePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }

    handleLogin() {
        let user = {
            email: this.state.email,
            password: this.state.password
        };

        API.users.login(user)
        .then(response => {
            if (response.status == 1) {
               this.props.router.push({ pathname: '/notes'})
            }
            else {
                alert("Wrong email and/or password");
            }
        })
    }

    render() {
        const email = this.state.email;
        const password = this.state.password;
        return(
            <Jumbotron>
                <PageHeader> VikaKeep Authorization Page <br/> <small> Authorization </small> </PageHeader>
                    <InputGroup>
                        <InputGroup.Addon> <Glyphicon glyph='envelope' /> </InputGroup.Addon>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={this.updateEmail.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon> <Glyphicon glyph='lock' /> </InputGroup.Addon>
                        <FormControl
                            type="password"
                            maxLength="40"
                            placeholder="Password"
                            value={password}
                            onChange={this.updatePassword.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                    </InputGroup>
                <Button bsStyle='primary' onClick={this.handleLogin.bind(this)}> Login </Button>
            </Jumbotron>
        )
    }
}
export default withRouter(Login);