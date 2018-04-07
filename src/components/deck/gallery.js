import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from '../../firebase';
import Swiper from 'react-native-deck-swiper';
import * as APIUtil from '../../api_util/api_util'
import { receiveUsersProfiles } from '../../actions/gallery_actions'
import { addLikeId } from '../../actions/user_actions'
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

  storeLikedId(likedUserId) {
    const currentUser = firebase.auth().currentUser
    this.props.addLikeId(currentUser, likedUserId)
  }

  checkIfMatch(likedId){
    if(!this.state.likedIds[`${likedId}`]) { return }

    this.handleLinking(likedId)
      //handle linking

  }

  handleLinking(likedId){
    const currentUser = firebase.auth().currentUser
    //create user chat
    //alert that a match is made 
  }

  render () {

    const profiles = this.props.gallery

    let details = this.state.details

    if(details) {
      return(
        <View style={styles.container}>
          <Text>LOADING</Text>
        </View>
      )

    } else {
      let matchedUserId = ''
      let userLikes = {}
      return(
        <View pointerEvents={this.props.pointerEvents} style={styles.container}>
            <Swiper
                cards={profiles}
                renderCard={(card) => {
                  matchedUserId = card.id
                  console.log('card.likeIds', card.likeIds);
                  userLikes = Object.assign({}, card.likeIds)
                    return (
                        <Card profile={card}/>

                    )
                }}
                verticalSwipe={false}
                onSwipedLeft={() => { console.log('dislike')}}
                onSwipedRight={() => {
                  this.setState({likedId: matchedUserId, likedIds: userLikes })
                  this.storeLikedId(this.state.likedId)
                  this.checkIfMatch(this.state.likedId)

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
  addLikeId: (user, likeId) => dispatch(addLikeId(user, likeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
