import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import getUser from '../api_util/api_util'
import { AppNavigator } from '../navigation/app_navigation'
import Main from '../components/main'

export default class Splash extends React.Component {

  componentDidMount() {
    this.fetchId();
  }

  async fetchId() {
    const { goBack, navigate } = this.props.navigation;
    try {
      const value = await AsyncStorage.getItem('@kenterId:key');
      console.log('value', value);
      if (value !== null){
        // We have data!!
        //fetch data from database, then navigate to main
        navigate('Main')
      } else {
        //navigate to login
        console.log('navigate away');
        navigate('Login')
      }
    } catch (error) {
      // Error retrieving data
    }
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
