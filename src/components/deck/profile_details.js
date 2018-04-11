import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, Image, View} from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from '../../firebase';

class ProfileDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { references: []}
  }

  componentWillMount(){
    this.loadProfile();
  }

  loadProfile() {

    const profile = this.props.navigation.state.params.profile
    this.setState({profile: profile})
    console.log('profile', profile);
    // const userId = profile.id
    // const photoRef = firebase.database().ref(`users/${userId}/photoReferences`)
    // photoRef.once('value', (snapshot) => {
    //
    //   const photoReferencesObject = snapshot.val();
      Object.values(profile.photoReferences).forEach((id) => {
        firebase.storage().ref(`images/${profile.id}/${id}`).getDownloadURL().then((url) => this.setState((prevState) => {
          return {references: [...prevState.references, {url: `${url}`}]}
        }))
        // .then((url) => console.log(url))
      })
    // })

  }

  render() {
    const { goBack } = this.props.navigate
    console.log('profile_details', this.props);
    console.log();
    let album = this.state.references
    return (
      <View>
          <Swiper horizontal={true} loop={false}>
                    {album.map((item, key) => {
                       return (
                           <Image key={key} style={{width: '100%', height: '75%'}} source={{uri: item.url}} />
                       )
                     })}

              </Swiper>
              <Text>{this.state.profile.about}</Text>
              <TouchableOpacity onPress={() => goBack()}><Text>Press this</Text></TouchableOpacity>
      </View>
    );
  }
}

export default ProfileDetails
