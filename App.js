import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebaseRef from './src/firebase.js'
import * as firebase from 'firebase';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;
import Login from './src/Authentication/login'

import getUser from './src/api_util/api_util'

firebaseRef();

export default class App extends React.Component {

  render() {
    return (
      <Login/>
    );
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
