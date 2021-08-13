/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reducers from './src/store/reducers';
import {name as appName} from './app.json';
import {DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {View,Text,LogBox} from 'react-native';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

const toastConfig = {
    info: (internalState) => (
        <View style={{height: 60, width: '100%', backgroundColor: 'pink'}}>
            <Text>{internalState.text1}</Text>
        </View>
    )
}

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const reduxApp = () => (
  <Provider store={createStoreWithMiddleware}>
    <PaperProvider>
      <App />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => reduxApp);
