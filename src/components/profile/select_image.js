
import React from 'react';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { Image, Text, Button, View, Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { addPhoto } from '../../actions/album_actions'
import { addPhotoReference, postPhotoReference } from '../../actions/user_actions'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob



class SelectImage extends React.Component {

   constructor(props){
     super(props)
     this.uploadImage = this.uploadImage.bind(this)
   }

   storePhotoLocally(photo) {
     let photoObject = Object.assign({}, photo)
     photoObject['id'] = `${photo.timestamp}${photo.fileName}`

     this.props.addPhoto(photoObject)
   }

   // More info on all the options is below in the README...just some common use cases shown here
   pickImage() {
    this.setState({ uploadURL: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'})

    ImagePicker.launchImageLibrary({}, photo  => {
      if(photo.didCancel) {
        console.log('canceling save');
        return
      }
      let photoObject = Object.assign({}, photo)
      photoObject['id'] = `${photo.timestamp}${photo.fileName}`

      this.storePhotoLocally(photoObject)
      this.uploadImage(photoObject)
        .then(photo => console.log('logging photo in then statement', photo))
        .catch(error => console.log(error))
    })
  }

  storePhotoReferenceInDatabase(url) {
    const currentUser = firebase.auth().currentUser
    this.props.postPhotoReference(currentUser, url)
  }



  uploadImage(photo, mime = 'application/octet-stream'){
    console.log('photo object', photo);
    //

    //just the location on local device
    const uri = photo.uri
    const storage = firebase.storage()

    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

      const currentUser = firebase.auth().currentUser

      console.log('photo is here trying to store', photo);
      let uploadBlob = null

      // creating reference here
      const imageRef = storage.ref(`images/${currentUser.uid}`).child(`${photo.id}`)

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          this.props.addPhotoReference(photo.id)
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          console.log(url);
          this.storePhotoReferenceInDatabase(url)
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })

  }



   render(){
     let album = this.props.album;


     const { navigate, goBack } = this.props.navigation
     return (
       <View style={styles.container}>
         <Button title="Upload photo" style={{width: 100, height: 100}} onPress={() => this.pickImage()} />
         <Text>hello</Text>
         <Button title='return to Profile' style={{width: 100, height: 100}} onPress={() => goBack()}/>
         <FlatList // !!!! FLATLIST, item in renderItem must be exactly item, cant choose own var
          data={album}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Image style={{flex: 1, width: 400, height: 400}}  source={{uri: `data:image/gif;base64,${item.data}`}} />}
          keyExtractor={(item, index) => index}
        />
      </View>
     )
   }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%'
  }
});

const mapStateToProps = (state) => ({
  album: state.album
});

const mapDispatchToProps = (dispatch) => ({
  addPhoto: (photo) => dispatch(addPhoto(photo)),
  addPhotoReference: (photo) => dispatch(addPhotoReference(photo)),
  postPhotoReference: (user, photoId) => dispatch(postPhotoReference(user, photoId))
});



export default connect(mapStateToProps, mapDispatchToProps)(SelectImage);
