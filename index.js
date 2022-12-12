/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
LogBox.ignoreAllLogs();
import store from './src/redux/Store/index';
import {name as appName} from './app.json';

function RealDcHistory() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => RealDcHistory);
