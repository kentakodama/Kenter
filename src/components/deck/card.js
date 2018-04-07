import React from 'react';
import { StyleSheet, ScrollView, Modal, Image, FlatList, Text, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from '../../firebase';
// import ProfileModal from './profile_modal'


class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {modalVisible: false, references: []}
  }

  componentWillMount() {
    this.loadProfile()
  }

// <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.profile.photoURL}}/>
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  loadProfile() {
    const profile = this.props.profile;
    console.log('profile', profile);
    const userId = profile.id
    const photoRef = firebase.database().ref(`users/${userId}/photoReferences`)
    photoRef.once('value', (snapshot) => {

      const photoReferencesObject = snapshot.val();
      Object.values(photoReferencesObject).forEach((id) => {
        firebase.storage().ref(`images/${userId}/${id}`).getDownloadURL().then((url) => this.setState((prevState) => {
          return {references: [...prevState.references, url]}
        }))
        // .then((url) => console.log(url))
      })
    })

    // photoRef.once('value', (snapshot) => {
    //
    //   const photoReferencesObject = snapshot.val();
    //   Object.values(photoReferencesObject).forEach((id) => {
    //     const imageRef = firebase.storage().ref(`images/${userId}/${id}`)
    //     imageRef.getDownloadURL().then((url) => this.setState((prevState) => {
    //       return {references: [...prevState.references, url]}
    //     }))
    //     // .then((url) => console.log(url))
    //   })
    // })

  }

  render () {



    if(this.state.modalVisible) {
      let album = this.state.references
      console.log(album);
      return(

          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <Swiper horizontal={true}>

                  {album.map((item, key) => {
                     return (
                         <Image key={key} style={{width: '100%', height: '75%'}} source={{uri: item}} />
                     )
                   })}

            </Swiper>

          <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible)}}><Text>Press this</Text></TouchableOpacity>
          </Modal>

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
