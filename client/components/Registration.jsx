import React from 'react';
import { Jumbotron, PageHeader, Button, FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";
import Alert from "./Alert.jsx";
import Tooltip from "./Tooltip.jsx";
import getMessage from "../messages.js";

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            email:'',
            password:'',
            repeatPassword:'',
            errorMessage:'',
            error:{}
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
                errorMessage: "Passwords not match",
                error: {password:  "NOT_MATCH"}
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
                errorMessage: "Wrong data",
                error: error
            });
        })
    }

    getValidationState(field) {
        return this.state.error[field] ? "error" : undefined
    }

    getValidationMessage(field) {
        return getMessage(this.state.error[field])
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
                <FormGroup validationState={this.getValidationState("name")}>
                    <Tooltip>{this.getValidationMessage("name")}</Tooltip>
                    <FormControl
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={this.updateName.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("email")}>
                    <Tooltip>{this.getValidationMessage("email")}</Tooltip>
                    <FormControl
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.updateEmail.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("password")}>
                    <Tooltip>{this.getValidationMessage("password")}</Tooltip>
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
                </FormGroup>
                <Button bsStyle='primary' onClick={this.handleRegistration.bind(this)}> Register </Button>
            </Jumbotron>
        )
    }
}

export default withRouter(Registration);
