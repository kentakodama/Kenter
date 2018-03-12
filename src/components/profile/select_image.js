
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { Image, Platform } from 'react-native';
import * as firebase from 'firebase';


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob



class SelectImage extends React.Component {

   constructor(props){
     super(props)
     this.state = {avatarSource: ''}
     this.uploadImage = this.uploadImage.bind(this)
   }

   // More info on all the options is below in the README...just some common use cases shown here
   pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      console.log(response);
      this.uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
  }

  uploadImage(uri, mime = 'application/octet-stream'){
    const storage = firebase.storage()
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const sessionId = new Date().getTime()
      let uploadBlob = null
      const imageRef = storage.ref('images').child(`${sessionId}`)

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

   componentDidMount(){
     this.pickImage();
   }

   render(){
     return (
       <Image source={this.state.avatarSource} />
     )
   }

}

export default SelectImage
