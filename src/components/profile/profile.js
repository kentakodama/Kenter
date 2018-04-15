import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import AboutMe from './about_me'
import SelectImage from './select_image'
import PhotoGallery from './photo_gallery'
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends React.Component {

  constructor(props){
    super(props)
  }

  editAbout(){
    const { navigate } = this.props.navigation;
    navigate('EditAbout')
  }

  getFirstNameOnly(fullName) {
    return fullName.split(' ')[0]
  }

  render() {



    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <PhotoGallery style={styles.photoGallery}/>

        <View style={styles.nameAndButtonContainer}>
          <View style={styles.name}><Text style={styles.nameText}>{this.getFirstNameOnly(this.props.user.name)}</Text></View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={()=> this.editAbout()}>
              <Icon name="edit" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> navigate('SelectImage')}>
                <Icon name="image" size={35} color="white"/>
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
  name: {
    flex: 3,
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 30,
    color: 'white',
    marginLeft: 20
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  aboutMe: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
