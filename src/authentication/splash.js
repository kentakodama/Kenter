import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import { AppNavigator } from '../navigation/app_navigation';
import { AccessToken } from 'react-native-fbsdk';
import * as firebase from 'firebase';
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

  fetchId() {
    const { navigate } = this.props.navigation;
    //the id is the facebook id, instead of using AsyncStorage facebook id is already stored in phone
    //as long as phone has facebook, this will work
    AccessToken.getCurrentAccessToken().then((token) => {
      if(token) {
        firebase.database().ref(`users/${token.userID}`)
        .on('value', (snapshot) => this.props.receiveUser(snapshot.val()))
        navigate('Main')
      } else {
        navigate('Login')
      }
    })

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
