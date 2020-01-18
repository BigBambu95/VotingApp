import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store'; 
import App from './components/app';
import './style.scss';

import PollService from './services/pollService';
import { PollServiceProvider } from './components/poll-service-context';

const pollService = new PollService();

ReactDOM.render(
<Provider store={store}>
    <PollServiceProvider value={pollService}>
        <Router>
            <App />
        </Router>
    </PollServiceProvider>
</Provider>, 
document.getElementById('root'));