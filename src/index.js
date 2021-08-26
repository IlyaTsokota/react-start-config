import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'Components/app';
import ErrorBoundry from 'Components/error-boundry';
import SomeService from 'Services/some-service';
import { SomeServiceProvider } from 'Components/some-service-context';

import store from './store';

const someService = new SomeService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <SomeServiceProvider value={someService}>
                <Router>
                    <App />
                </Router>
            </SomeServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);