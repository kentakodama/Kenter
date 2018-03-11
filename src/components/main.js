import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import Login from '../authentication/login';

class Main extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: '20%', fontSize: 40 }}>You are Logged in</Text>
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

export default Main
