import React from 'react';
import { Jumbotron, PageHeader, Button, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router';
import API from "../api.js";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            email:'',
            oldPassword:'',
            newPassword:'',
            repeatPassword:''
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
    }

    handleChangeData() {
        const newUserData = {
            name:  this.state.name,
            email: this.state.email
        };

        API.users.update(newUserData)
        .then(user => {
            alert("Changes successfully saved");
        })
        .catch(error => {
            alert(error);
        });
    }

    handleChangePassword() {
        const passwordData = {
            oldPassword:       this.state.oldPassword,
            newPassword:       this.state.newPassword,
            repeatPassword: this.state.repeatPassword
        };
        console.log(passwordData);
        if (passwordData.newPassword != passwordData.repeatPassword) {
            alert("Passwords not match");
            return;
        }

        API.users.changePassword(passwordData)
        .then(user => {
            alert("Password successfully saved");
            this.setState({
                oldPassword:'',
                newPassword:'',
                repeatPassword:''
            })
        })
        .catch(error => {
            alert(error);
        });
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
                <FormControl
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={this.updateName.bind(this)}
                />
                <FormControl
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.updateEmail.bind(this)}
                />
                <Button bsStyle='primary' onClick={this.handleChangeData.bind(this)}> Change data </Button>
                <FormControl
                    type="password"
                    maxLength="40"
                    placeholder="Password"
                    value={oldPassword}
                    onChange={this.updateOldPassword.bind(this)}
                />
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
                <Button bsStyle='primary' onClick={this.handleChangePassword.bind(this)}> Change password </Button>
            </Jumbotron>
        )
    }
}

export default withRouter(Profile);