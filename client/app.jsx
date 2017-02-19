import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Container, Login, Registration, Profile, Notes, Tags, Logout } from './components';

class NoMatch extends React.Component {
    render() {
        return (<h1> 404 page not found </h1>);
    }
}

render((
    <Router history={browserHistory}>
        <Route path='/' component={Container}>
            <IndexRoute component={Notes} />
            <Route path='login' component={Login} />
            <Route path='registration' component={Registration} />
            <Route path='profile' component={Profile} />
            <Route path='notes' component={Notes} />
            <Route path='tags' component={Tags} />
            <Route path='logout' component={Logout} />
            <Route path='*' component={NoMatch} />
        </Route>
    </Router>
), document.getElementById('app'));

