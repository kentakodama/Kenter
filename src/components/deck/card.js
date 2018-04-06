import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from '../../firebase';


class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {details: false}
  }

// <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.profile.photoURL}}/>

  render () {

    // const profile = this.props.profile;
    // console.log(profile);
    // const userId = profile.id
    // const usersRef = firebase.storage().ref(`images/${userId}`)
    // usersRef.getDownloadURL().then((url) => console.log(url))
    // // const album =
    //

    //get the userid of profile
    // go to images/userid
    //create array of album
    //place into swiper


    if(this.state.details) {
      const profile = this.props.profile;

      const userId = profile.id
      const usersRef = firebase.storage().ref(`images/${userId}/2009-10-09T21:09:20ZIMG_0002.JPG`)
      usersRef.getDownloadURL().then((url) => console.log(url))



      return(
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 4, width: '100%', backgroundColor: 'blue'}}
              onPress={()=> this.setState({details:false})}>
              <Swiper horizontal={true}>
                  {album.map((item, key) => {
                     return (
                         <Image key={key} style={styles.images}source={{uri: `data:image/gif;base64,${item.data}`}} />
                     )
                   })}
              </Swiper>
          </TouchableOpacity>


          <Text style={styles.text}>{this.props.profile.name}</Text>
          <Text style={styles.text}>{this.props.profile.about}</Text>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 4, width: '100%', backgroundColor: 'red'}}
              onPress={()=> this.setState({details:true})}>
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
  text: {
    flex: 1,
    textAlign: "center",
    color: 'black',
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default Card
