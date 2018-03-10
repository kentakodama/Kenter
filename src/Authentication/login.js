import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;

import getUser from '../api_util/api_util'

export default class Login extends React.Component {


  initUser(user) {

    var db = firebase.database();

      let key = user.uid
      let userRef = db.ref(`users/${key}`);

      userRef.once('value', (snapshot) => {
          if (snapshot.val()) {
            console.log('user already exists');
            return
          }
          let newUser = {
            id: key,
            name: user.displayName,
            photoURL: user.photoURL
          }
          userRef.set(newUser)
      });

  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                      // Create a new Firebase credential with the token
                      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                      // Login with the credential
                      return firebase.auth().signInWithCredential(credential);
                    })
                    .then((user) => {
                      console.log('user object', user);
                      this.initUser(user)
                    })
                    .catch((error) => {
                      const { code, message } = error;
                      // For details of error codes, see the docs
                      // The message contains the default Firebase string
                      // representation of the error
                    });
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>

      </View>
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
