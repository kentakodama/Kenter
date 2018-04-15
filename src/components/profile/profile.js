import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import AboutMe from './about_me'
import SelectImage from './select_image'
import PhotoGallery from './photo_gallery'

class Profile extends React.Component {

  constructor(props){
    super(props)
  }

  editAbout(){
    const { navigate } = this.props.navigation;
    navigate('EditAbout')
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <PhotoGallery style={styles.photoGallery}/>

        <View style={styles.nameAndButtonContainer}>
          <View style={styles.nameContainer}><Text>Name</Text></View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
                onPress={()=> navigate('SelectImage')}>
                <Text style={styles.text}>Upload a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.editAbout()}>
                <Text style={styles.text}>Edit your profile text</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AboutMe navigation={this.props.navigation} style={styles.aboutMe}/>
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
  },
  photoGallery: {
    flex: 1,
    width: '100%'
  },
  nameAndButtonContainer: {
    flex: .3,
    flexDirection: 'row',
    backgroundColor: 'red'
  },
  nameContainer: {
    flex: 1
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  aboutMe: {
    flex: 1
  }
});

export default Profile
