/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers';
import {name as appName} from './app.json';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = createStore(
    reducers,
    composeEnhancers(applyMiddleware(promiseMiddleware))
)

const reduxApp = () => (
    
    <Provider store={createStoreWithMiddleware}>
            <App />
        </Provider>
)

AppRegistry.registerComponent(appName, () => reduxApp);
