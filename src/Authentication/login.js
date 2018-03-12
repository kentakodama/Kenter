import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;
import { connect } from 'react-redux';

import getUser from '../api_util/api_util'
import AppNavigator from '../navigation/app_navigation'
import { receiveUser } from '../actions/user_actions';

class Login extends React.Component {


  initUser(user, id) {
    const { navigate } = this.props.navigation;
    var db = firebase.database();

      let userRef = db.ref(`users/${id}`);
      console.log('user object', user);
      userRef.once('value', (snapshot) => {
          if (snapshot.val()) {
            console.log('user already exists');
            return
          }

          let newUser = {
            id,
            name: user.displayName,
            photoURL: user.photoURL
          }
          userRef.set(newUser)
      })
      this.props.receiveUser(id)
      navigate('CompleteProfile')

  }


  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <LoginButton
          readPermissions={['public_profile', 'email', 'user_birthday']}
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
                      firebase.auth().signInWithCredential(credential)
                      .then((user) => {
                        this.initUser(user, data.userID)
                      })
                    })
                    .catch((error) => {
                      const { code, message } = error;
                      console.log(code, message);
                    });
              }
            }
          }
          onLogoutFinished={() => navigate('Splash')}/>

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

const mapDispatchToProps = (dispatch) => ({
  receiveUser: (id) => dispatch(receiveUser(id))
});

export default connect(null, mapDispatchToProps)(Login);
