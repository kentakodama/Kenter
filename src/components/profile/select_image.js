
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { Image, Text, Button, View, Platform, FlatList } from 'react-native';
import * as firebase from 'firebase';


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob



class SelectImage extends React.Component {

   constructor(props){
     super(props)
     this.state = {photos:[]}
     this.uploadImage = this.uploadImage.bind(this)
   }


   // More info on all the options is below in the README...just some common use cases shown here
   pickImage() {
    this.setState({ uploadURL: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'})

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
          console.log(url);
          const photoURLs = this.state.photos.slice();
          photoURLs.push(url)
          this.setState({photos: photoURLs})
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }


  // let rootRef = firebase.storage().ref();
  //           let fileRef = rootRef.child(`images/${fileName}`);
  //           fileRef.put(file)
  //               .then(() => {
  //                   console.log("file uploaded with success congrats");
  //               })
  //               .catch(err => console.log(err));
  //           fileRef.getDownloadURL()
  //               .then((url) => {
  //                   //Getting the download url.
  //                   console.log(`Download Url : ${url}`);
  //               })
  //               .catch(err => console.log(err));
  //       }

   componentDidMount(){
     this.pickImage();
   }

   render(){
     let images = this.state.photos;
     return (
       <View style={{ backgroundColor: 'red', width: '100%', height: '100%'}}>
       <Button title="Upload photo" style={{width: 100, height: 100}} onPress={() => this.pickImage()} />
       <Text>hello</Text>
        <FlatList
          data={images}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Image source={{uri: item}}/>}
          keyExtractor={(item, index) => index}
        />
      </View>
     )
   }

}
// <Image style={{width: 100, height: 100}} source={{uri: this.state.photos}} />

export default SelectImage
