import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import firebase from '../firebase';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;
import { connect } from 'react-redux';
import AppNavigator from '../navigation/app_navigation'
import { receiveUser, createNewUser } from '../actions/user_actions';

class Login extends React.Component {


  handleUser(user) {

    const allUsersRef = firebase.database().ref('users');

    allUsersRef.child(user.uid).once('value', (snapshot) => {
      const potentialUser = snapshot.val()
      if (potentialUser !== null) {
        this.returningUser(potentialUser)
      } else {
        this.initUser(user)
      }
    });

  }

  initUser(user) {
    const { navigate } = this.props.navigation;
    const newUser = {
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      about: 'Tell us about yourself'
    }
    this.props.createNewUser(newUser) // to database
    this.props.receiveUser(newUser) // to state
    navigate('Main')

  }

  returningUser(oldUser) {
    const user = {
      id: oldUser.id,
      name: oldUser.name,
      photoURL: oldUser.photoURL,
      about: oldUser.about
    }
    const { navigate } = this.props.navigation;
    this.props.receiveUser(user)
    navigate('Main')
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
                        this.handleUser(user)
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
  receiveUser: (id) => dispatch(receiveUser(id)),
  createNewUser: (id) => dispatch(createNewUser(id)),
  updateUserInfo: (user) => dispatch(updateUserInfo(user))
});

export default connect(null, mapDispatchToProps)(Login);
