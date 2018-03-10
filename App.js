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

firebaseRef();

export default class App extends React.Component {

  // _fbAuth() {
  //   LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
  //     if (result.isCancelled) {
  //       console.log("Login Cancelled");
  //     } else {
  //       console.log(result);
  //       console.log("Login Success permission granted:" + result.grantedPermissions);
  //     }
  //   }, function(error) {
  //      console.log("some error occurred!!");
  //   })
  // }
  //
  // render() {
  //   return (
  //     <View style={styles.container}>
  //      <TouchableOpacity onPress={this._fbAuth}>
  //        <Text>
  //          Login With Facebook
  //        </Text>
  //      </TouchableOpacity>
  //     </View>
  //   );
  // }

  render() {
    return (
      <View>
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
                      // If you need to do anything with the user, do it here
                      // The user will be logged in automatically by the
                      // `onAuthStateChanged` listener we set up in App.js earlier
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
