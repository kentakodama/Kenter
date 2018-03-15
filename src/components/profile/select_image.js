
import React from 'react';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import { Image, Text, Button, View, Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { addPhoto } from '../../actions/album_actions'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob



class SelectImage extends React.Component {

   constructor(props){
     super(props)
     console.log(this.props);
     this.state = {photo: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'}
     this.uploadImage = this.uploadImage.bind(this)

   }

   storePhotoLocally(photo) {
     console.log('photo data herererere', photo);
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
      this.setState({ photo: photo.data })

      this.storePhotoLocally(photo)

      this.uploadImage(photo.uri)
        .then(url => console.log(url))
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
          console.log('data', data);
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          console.log('blob', blob);
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
  addPhoto: (photo) => dispatch(addPhoto(photo))
});



export default connect(mapStateToProps, mapDispatchToProps)(SelectImage);
