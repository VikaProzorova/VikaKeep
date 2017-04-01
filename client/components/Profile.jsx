import React from 'react';
import { Jumbotron, PageHeader, Button, FormControl, FormGroup } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { render } from 'react-dom';
import API from "../api.js";
import Alert from "./Alert.jsx";
import Tooltip from "./Tooltip.jsx";
import getMessage from "../messages.js";

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

    updateField(field) {
        return event => {
            const cleanError = {}

            Object.keys(this.state.error)
            .filter(key => key !== field)
            .map(key => {
                cleanError[key] = this.state.error[key]
            })

            this.setState({
                [field]: event.target.value,
                error: cleanError
            })
        }
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
                errorMessage: "Some bullshit!",
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
                errorMessage: "Some bullshit!",
                error: error
            });
            return
        });
    }

    getValidationState(field) {
        return this.state.error[field] ? "error" : undefined
    }
    getValidationMessage(field) {
        return getMessage(this.state.error[field])
    }

    render() {
        const email          = this.state.email;
        const name           = this.state.name;
        const oldPassword    = this.state.oldPassword;
        const newPassword    = this.state.newPassword;
        const repeatPassword = this.state.repeatPassword;

        return(
            <Jumbotron>
                <PageHeader> VikaKeep Profile Page <br/> <small> Profile </small> </PageHeader>
                <Alert style="warning">{this.state.errorMessage}</Alert>
                <Alert style="success">{this.state.successMessage}</Alert>
                <FormGroup validationState={this.getValidationState("name")}>
                    <Tooltip>{this.getValidationMessage("name")}</Tooltip>
                    <FormControl
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={this.updateField("name")}
                    />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("email")}>
                    <Tooltip>{this.getValidationMessage("email")}</Tooltip>
                    <FormControl
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.updateField("email")}
                    />
                </FormGroup>
                <Button bsStyle='primary' onClick={this.handleChangeData.bind(this)}> Change data </Button>
                <br/> <br/>
                <FormGroup validationState={this.getValidationState("oldPassword")}>
                    <Tooltip>{this.getValidationMessage("oldPassword")}</Tooltip>
                    <FormControl
                        type="password"
                        maxLength="40"
                        placeholder="Password"
                        value={oldPassword}
                        onChange={this.updateField("oldPassword")}
                    />
                </FormGroup>
                <FormGroup validationState={this.getValidationState("newPassword")}>
                    <Tooltip>{this.getValidationMessage("newPassword")}</Tooltip>
                    <FormControl
                        type="password"
                        maxLength="40"
                        placeholder="New password"
                        value={newPassword}
                        onChange={this.updateField("newPassword")}
                    />
                    <Tooltip>{this.getValidationMessage("newPassword")}</Tooltip>
                    <FormControl
                        type="password"
                        maxLength="40"
                        placeholder="Repeat new password"
                        value={repeatPassword}
                        onChange={this.updateField("repeatPassword")}
                    />
                </FormGroup>
                <Button bsStyle='primary' onClick={this.handleChangePassword.bind(this)}> Change password </Button>
            </Jumbotron>
        )
    }
}

export default withRouter(Profile);