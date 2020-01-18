import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Header from '../header';
const PollListContainer = lazy(() => import('../../containers/poll-list-container'));
const PollDetailsContainer = lazy(() => import('../../containers/poll-details-container'));
const UserPollListContainer = lazy(() => import('../../containers/user-poll-list-container'));
const LoginForm = lazy(() => import('../login-form'));
const CreatePollForm = lazy(() => import('../create-poll-form'));
const RegistrationForm = lazy(() => import('../registration-form'));
import { Home } from '../pages';
import { withPollService } from '../hoc';
import { userActions } from '../../actions';
import Loader from '../loader';
import ErrorBoundary from '../error-boundary';

class App extends React.Component {

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        const { pollService, login } = this.props;
        const token = localStorage.getItem('token');
        if(token) {
            pollService
                .getProfile(token)
                .then(({user}) => login(user))
                .catch(err => console.error(err));
        }
    }

    render() {
        return(
            <div className="voting-app">
                <Header />
                <main className="main">
                    <div className="container flex justify-center align-center">
                        <ErrorBoundary>
                            <Suspense fallback={<Loader />}>
                                <Switch>
                                    <Route path="/" component={Home} exact />
                                    <Route path="/polls" component={PollListContainer} exact />
                                    <Route path="/polls/:id" component={PollDetailsContainer} />
                                    <Route path="/create-poll" component={CreatePollForm} />
                                    <Route path="/user-polls" component={UserPollListContainer} exact />
                                    <Route path="/registration" component={RegistrationForm} exact />
                                    <Route path="/login" component={LoginForm} exact />
                                </Switch>
                            </Suspense>                         
                        </ErrorBoundary>                       
                    </div>
                </main>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (name) => dispatch(userActions.login(name))
    }
}

export default compose(
    withPollService(),
    connect(null, mapDispatchToProps)
)(App);