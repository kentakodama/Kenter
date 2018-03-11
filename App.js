import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/store';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebaseRef from './src/firebase.js'
import * as firebase from 'firebase';
import AppNavigator from './src/navigation/app_navigation'
import { StackNavigator} from 'react-navigation';


firebaseRef();

export default class App extends React.Component {

  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
