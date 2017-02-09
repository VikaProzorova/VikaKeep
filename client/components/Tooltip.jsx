import React from 'react';
import { Tooltip } from 'react-bootstrap';

class TooltiptDismissable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipVisible: false
        };
    }

    componentWillReceiveProps() {
        this.setState({tooltipVisible: false});
    }

    render() {
        if (this.props.children) {
            return (
                <div style={{float: 'right'}}>
                    <Tooltip placement="right" className="in" id="tooltip-top">
                        {this.props.children}
                    </Tooltip>
                </div>
            );
        }
        return null;
    }
};

export default TooltiptDismissable;