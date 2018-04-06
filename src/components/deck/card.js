import React from 'react';
import { StyleSheet, Modal, Image, FlatList, Text, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from '../../firebase';
// import ProfileModal from './profile_modal'


class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {modalVisible: false}
  }

// <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.profile.photoURL}}/>
setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

  render () {

    const album = [];
    const profile = this.props.profile;
    console.log(profile);
    const userId = profile.id
    const photoRef = firebase.database().ref(`users/${userId}/photoReferences`)
    photoRef.once('value', (snapshot) => {
      const photoReferencesObject = snapshot.val();
      Object.values(photoReferencesObject).forEach((id) => {
        const imageRef = firebase.storage().ref(`images/${userId}/${id}`)
        imageRef.getDownloadURL().then((url) => album.push(url))
        // .then((url) => console.log(url))
      })
    })
    console.log(album);

    if(this.state.modalVisible) {

      return(
        <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible)}} style={{marginTop: 22}}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <TouchableOpacity style={{flex: 1, width: '100%', marginTop: 22}} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
              <View>
                <Text>Hello World!</Text>
              </View>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Modal</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )

    } else {
      return(
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 4, width: '100%', backgroundColor: 'red'}}
              onPress={()=> this.setState({modalVisible: true})}>
              <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.profile.photoURL}}/>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.profile.name}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  images: {
    flex: 1
  },
  text: {
    flex: 1,
    textAlign: "center",
    color: 'black',
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default Card
