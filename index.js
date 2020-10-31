import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { name as appName } from './app.json';
import configureStore from './store';
import RootNavigator from './navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

const { store, persistor } = configureStore();

AppRegistry.registerComponent(appName, () => () => (
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  </PersistGate>
));
