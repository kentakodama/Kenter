import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import AboutMe from './about_me'
import SelectImage from './select_image'

class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = { introMessage: '', pic1URL: '', pic2URL: '', pic3URL: '' };
    console.log(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: '100%', backgroundColor: 'yellow'}}/>
        <AboutMe navigation={this.props.navigation} style={{flex: 1, width: '100%'}}/>
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
