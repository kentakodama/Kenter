import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        <View style={{flex: 1, width: '100%', backgroundColor: 'yellow'}}/>
        <View style={{flex: 1, width: '100%', backgroundColor: 'gray'}}>
          <Text>About me</Text>
        </View>
        <View style={{flex: 1, width: '100%', backgroundColor: 'red'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Profile
