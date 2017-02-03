import React from 'react';
import { Jumbotron, PageHeader, Button, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";
import Alert from "./Alert.jsx";

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            email:'',
            password:'',
            repeatPassword:'',
            errorMessage:''
        };
    }

    updateName(event) {
        this.setState({
            name: event.target.value
        });
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

    updateRepeatPassword(event) {
        this.setState({
            repeatPassword: event.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleRegistration();
        }
    }

    handleRegistration() {
        if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                errorMessage: "Passwords not match"
            });
            return;
        }

        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };
        API.users.register(user)
        .then(() => {
            this.props.router.push({ pathname: '/login' });
        })
        .catch(error => {
            this.setState({
                errorMessage: "Wrong data" + error
            });
        })
    }

    render() {
        const email = this.state.email;
        const password = this.state.password;
        const name = this.state.name;
        const repeatPassword = this.state.repeatPassword;

        return(
            <Jumbotron>
                <PageHeader> VikaKeep Registration Page <br/> <small> Registration </small> </PageHeader>
                <Alert style="warning">{this.state.errorMessage}</Alert>
                <FormControl
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={this.updateName.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <FormControl
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.updateEmail.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <FormControl
                    type="password"
                    maxLength="40"
                    placeholder="Password"
                    value={password}
                    onChange={this.updatePassword.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <FormControl
                    type="password"
                    maxLength="40"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={this.updateRepeatPassword.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <Button bsStyle='primary' onClick={this.handleRegistration.bind(this)}> Register </Button>
            </Jumbotron>
        )
    }
}

export default withRouter(Registration);
