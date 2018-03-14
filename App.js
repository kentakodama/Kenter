import React from 'react';
import { Provider, connect } from 'react-redux';
import * as Store from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from './src/firebase'
// import * as firebase from 'firebase';
import AppNavigator from './src/navigation/app_navigation'
import { StackNavigator} from 'react-navigation';



export default class App extends React.Component {

  render() {
    const { persistor, store } = Store

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
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

const mapStateToProps = (state) => ({
  about: state.user
});
