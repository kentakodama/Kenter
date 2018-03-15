import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import { AppNavigator } from '../navigation/app_navigation';
import { AccessToken } from 'react-native-fbsdk';
import firebase from '../firebase';
import { receiveUser } from '../actions/user_actions';

import Profile from '../components/complete_profile'
import Main from '../components/main'

class Splash extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchId();
  }

  returningUser(oldUser) {
    const user = {
      id: oldUser.id,
      name: oldUser.name,
      photoURL: oldUser.photoURL,
      about: oldUser.about,
      photoReferences: oldUser.addPhotoReference
    }
    console.log('user', user);
    const { navigate } = this.props.navigation;
    this.props.receiveUser(user)
    navigate('Main')
  }

  handleUser(user) {
    console.log('auth user', user);
    const allUsersRef = firebase.database().ref('users');

    allUsersRef.child(user.uid).once('value', (snapshot) => {
      const potentialUser = snapshot.val()
      console.log('potentialUser', potentialUser);
      this.returningUser(potentialUser)

    });

  }


  fetchId() {
    const { navigate } = this.props.navigation;
    //the id is the facebook id, instead of using AsyncStorage facebook id is already stored in phone
    //as long as phone has facebook, this will work
    AccessToken.getCurrentAccessToken().then((data) => {
      if(!data) {
        navigate('Login')
      } else {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        // Login with the credential
        firebase.auth().signInWithCredential(credential)
        .then((user) => {

          this.handleUser(user)
        })
      }
    })
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>splash</Text>
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

export default connect(null, mapDispatchToProps)(Splash);
