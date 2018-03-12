import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

import SelectImage from './select_image'

class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = { introMessage: '', pic1URL: '', pic2URL: '', pic3URL: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: '20%', fontSize: 40 }}>This is the profile page</Text>
        <SelectImage/>
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

export default Profile
