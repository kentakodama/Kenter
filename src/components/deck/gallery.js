import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import Swiper from 'react-native-deck-swiper';

class Gallery extends React.Component {

  render () {
    return(

      <View style={styles.container}>
          <Swiper
              cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY', 'DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
              renderCard={(card) => {
                  return (
                      <View style={styles.card}>
                          <Text style={styles.text}>{card}</Text>
                      </View>
                  )
              }}
              onSwipedTop={() => { console.log('SUPER LIKED!')}}
              onSwipedLeft={() => { console.log('dislike')}}
              onSwipedRight={() => { console.log('like!')}}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {console.log('onSwipedAll')}}
              cardIndex={0}
              backgroundColor={'#4FD0E9'}
              stackSize= {3}>
              <Button
                  onPress={() => {console.log('oulala')}}
                  title="Press me">
                  You can press me
              </Button>
          </Swiper>
      </View>
    )
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
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default Gallery
