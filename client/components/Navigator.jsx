import React from 'react';
import { withRouter } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const linksBar = {
    login: {
        title: 'Login',
        links: [ 'registration' ]
    },
    notes: {
        title: 'Notes',
        links: [ 'profile', 'tags', 'logout' ]
    },
    tags: {
        title: 'Tags',
        links: ['notes', 'profile', 'logout' ]
    },
    profile: {
        title: 'Profile',
        links: [ 'notes', 'tags', 'logout' ]
    },
    registration: {
        title: 'Registration',
        links: [ 'login' ]
    },
    logout: {
        title: 'Logout',
        links: [],

    }
}

class Navigator extends React.Component {
    handleSelect(key) {
        this.props.router.push(key);
    }

    render() {
        const currentPath = this.props.location.pathname.substring(1) || 'notes'
        const navLinks = linksBar[currentPath].links.map(link => {
            return <NavItem key={link} eventKey={'/' + link}> {linksBar[link].title}</NavItem>
        })

        return (<Navbar fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    VikaKeep
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Form>
                    <Nav
                        bsStyle='tabs'
                        activeKey={this.props.location.pathname}
                        onSelect={this.handleSelect.bind(this)}>
                        {navLinks}
                    </Nav>
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>);
    }
}

export default withRouter(Navigator);
