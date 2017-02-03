import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class AlertDismissable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisible: true
        };
    }

    componentWillReceiveProps() {
        this.setState({alertVisible: true});
    }

    render() {
        if (this.state.alertVisible && this.props.children) {
            return (
                <Alert bsStyle={this.props.style} onDismiss={this.handleAlertDismiss.bind(this)}>
                    <p>{this.props.children}</p>
                </Alert>
            );
        }

        return null;
    }

    handleAlertDismiss() {
      this.setState({alertVisible: false});
    }

};

export default AlertDismissable;
