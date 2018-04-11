import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from '../../firebase';
import random from 'random-key-generator';
import Swiper from 'react-native-deck-swiper';
import * as APIUtil from '../../api_util/api_util'
import { receiveUsersProfiles } from '../../actions/gallery_actions'
import { addLikeId } from '../../actions/user_actions'
import { receiveChatInfo } from '../../actions/chats_actions'
import Card from './card'

class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = {profiles: [], details: false, likedId: '', likedIds: {}}
    console.log('rendering gallery');
  }

  componentWillMount() {
    console.log('loading');
    this.getUserProfiles()
  }

  getUserProfiles = () => {
    const usersRef = firebase.database().ref('users');
    usersRef.once('value', (snapshot) => {
      this.props.receiveUsersProfiles(snapshot.val());
      });
  }

  storeLikedId(likedUser) {
    const currentUser = firebase.auth().currentUser
    this.props.addLikeId(currentUser, likedUser.id)
  }

  checkIfMatch(likedPerson){
    console.log('likedPerson', likedPerson);
    const currentUser = firebase.auth().currentUser
    if(!likedPerson.likeIds[`${currentUser.uid}`]) { return }

    this.handleLinking(likedPerson)
      //handle linking

  }

  handleLinking(likedPerson){

    const key = random(64)
    const currentUser = firebase.auth().currentUser
    //create user chat
    //alert that a match is made
    APIUtil.createThread(key, currentUser, likedPerson);

    const chatInfo = { id: key, members: [currentUser.displayName, likedPerson.name]}

    this.props.receiveChatInfo(chatInfo);
  }


  render () {

    const profiles = this.props.gallery
    console.log('gallery', this.props);
      let matchedUser = {}
      console.log('this.props.pointerEvents', this.props.pointerEvents);
      return(
        <View pointerEvents={this.props.pointerEvents} style={styles.container}>
            <Swiper
                cards={profiles}
                renderCard={(card) => {
                  matchedUser = Object.assign({}, card)

                    return (
                        <Card profile={card} navigation={this.props.navigation} />

                    )
                }}
                verticalSwipe={false}
                onSwipedLeft={() => { console.log('dislike')}}
                onSwipedRight={() => {

                  this.storeLikedId(matchedUser)
                  this.checkIfMatch(matchedUser)

                }}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                cardIndex={0}
                backgroundColor={'#4FD0E9'}
                stackSize= {3}>

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


const mapStateToProps = (state) => ({
  gallery: state.gallery,
  pointerEvents: state.utlities.pointerEvents
});

const mapDispatchToProps = (dispatch) => ({
  receiveUsersProfiles: (id) => dispatch(receiveUsersProfiles(id)),
  addLikeId: (user, likeId) => dispatch(addLikeId(user, likeId)),
  receiveChatInfo: (chatInfo) => dispatch(receiveChatInfo(chatInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
