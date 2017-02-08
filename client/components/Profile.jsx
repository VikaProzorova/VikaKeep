import React from 'react';
import { Jumbotron, PageHeader, Button, FormControl, FormGroup } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { render } from 'react-dom';
import API from "../api.js";
import Alert from "./Alert.jsx";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            email:'',
            oldPassword:'',
            newPassword:'',
            repeatPassword:'',
            errorMessage:'',
            successMessage:'',
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

    updateOldPassword(event) {
        this.setState({
            oldPassword: event.target.value
        });
    }

    updateNewPassword(event) {
        this.setState({
            newPassword: event.target.value
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

    componentWillMount() {
        API.users.show()
        .then(user => {
            this.setState({
                name: user.name,
                email: user.email
            })
        })
        .catch((error) => {
            if (error == "Permission denied") {
                this.props.router.push({ pathname: '/login' });
                return;
            }
            this.setState({
                errorMessage: "Some bullshit! " + JSON.stringify(error),
                error: error
            });
        });
    }

    handleChangeData() {
        const newUserData = {
            name:  this.state.name,
            email: this.state.email
        };

        API.users.update(newUserData)
        .then(user => {
            this.setState({
                successMessage: "Changes successfully saved"
            });
        })
        .catch(error => {
            this.setState({
                errorMessage: "Some bullshit! " + JSON.stringify(error),
                error: error
            });
        });
    }

    handleChangePassword() {
        const passwordData = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            repeatPassword: this.state.repeatPassword
        };

        if (passwordData.newPassword != passwordData.repeatPassword) {
            this.setState({
                errorMessage: "Passwords not match",
                error: {newPassword: "Passwords not match"}
            });
            return;
        }

        API.users.changePassword(passwordData)
        .then(user => {
            this.setState({
                oldPassword:'',
                newPassword:'',
                repeatPassword:'',
                successMessage: "Password successfully saved",
                error:{}
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: "Some bullshit! " + JSON.stringify(error),
                error: error
            });
        });
    }

    getValidationState(field) {
        return this.state.error[field] ? "error" : undefined
    }

    render() {
        const email = this.state.email;
        const name = this.state.name;
        const oldPassword = this.state.oldPassword;
        const newPassword = this.state.newPassword;
        const repeatPassword = this.state.repeatPassword;

        return(
            <Jumbotron>
                <PageHeader> VikaKeep Profile Page <br/> <small> Profile </small> </PageHeader>
                <Alert style="warning">{this.state.errorMessage}</Alert>
                <Alert style="success">{this.state.successMessage}</Alert>
                <FormGroup validationState={this.getValidationState("name")}>
                    <FormControl
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={this.updateName.bind(this)}
                    />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("email")}>
                    <FormControl
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.updateEmail.bind(this)}
                    />
                </FormGroup>
                <Button bsStyle='primary' onClick={this.handleChangeData.bind(this)}> Change data </Button>
                <br/> <br/>
                <FormGroup validationState={this.getValidationState("oldPassword")}>
                    <FormControl
                        type="password"
                        maxLength="40"
                        placeholder="Password"
                        value={oldPassword}
                        onChange={this.updateOldPassword.bind(this)}
                    />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("newPassword")}>
                    <FormControl
                        type="password"
                        maxLength="40"
                        placeholder="New password"
                        value={newPassword}
                        onChange={this.updateNewPassword.bind(this)}
                    />
                    <FormControl
                        type="password"
                        maxLength="40"
                        placeholder="Repeat new password"
                        value={repeatPassword}
                        onChange={this.updateRepeatPassword.bind(this)}
                    />
                </FormGroup>
                <Button bsStyle='primary' onClick={this.handleChangePassword.bind(this)}> Change password </Button>
            </Jumbotron>
        )
    }
}

export default withRouter(Profile);