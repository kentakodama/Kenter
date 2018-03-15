import React from 'react';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import { Image, Text, Button, View, Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

class Gallery extends React.Component {

   constructor(props){
     super(props)

   }

   render(){
     const album = this.props.album;

     return (

         <Swiper horizontal={true}>
                   {album.map((item, key) => {
                      return (

                          <Image style={{flex: 1, width: 400, height: 400}}  source={{uri: `data:image/gif;base64,${item.data}`}} />

                      )
                    })}
         </Swiper>

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



export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
