import React from 'react';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import { Image, View, StyleSheet} from 'react-native';

class PhotoGallery extends React.Component {

   constructor(props){
     super(props)

   }

   render(){
     const album = this.props.album;
     //cant put styles in swiper only nested children
     return (

         <Swiper style={{flex: 1}} horizontal={true}>
             {album.map((item, key) => {
                return (
                    <Image key={key} style={styles.images} source={{uri: `data:image/gif;base64,${item.data}`}} />
                )
              })}
         </Swiper>

     )
   }

}

const styles = StyleSheet.create({
  images: {
    flex: 1,
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



export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);
