import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import AboutMe from './about_me'
import SelectImage from './select_image'
import Gallery from './gallery'

class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = { introMessage: '', pic1URL: '', pic2URL: '', pic3URL: '' };
    console.log(props);
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={{flex: 1}}>LOGO</Text>
        <Gallery style={{flex: 1, width: '100%'}}/>
        <TouchableOpacity style={{flex: 1, width: '100%', backgroundColor: 'blue'}}
            onPress={()=> navigate('SelectImage')}>
            <Text>Upload a photo</Text>
        </TouchableOpacity>
        <AboutMe navigation={this.props.navigation} style={{flex: 1, width: '100%'}}/>
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
