import React from 'react';
import { withRouter } from 'react-router';
import API from "../api.js";


class Logout extends React.Component {
    componentWillMount() {
        API.users.logout()
        .then(() => {
            this.props.router.push({ pathname: '/login'})
        });
    }
    render() {
       return <div> Logout.. </div>
    }
}

export default withRouter(Logout);