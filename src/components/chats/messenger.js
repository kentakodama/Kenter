import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';
import Thread from './thread'
import ThreadPreview from './thread_preview'

class Messenger extends React.Component {

  constructor(props){
    super(props)
    this.state = { threads:[] };
  }

  componentWillMount() {
    this.loadThreadIds();
  }

  loadThreadIds() {
    // grab threads from global state

    const currentUser = firebase.auth().currentUser
    const threadsRef = firebase.database().ref(`users/${currentUser.uid}/threads`);
    threadsRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      Object.keys(snapshot.val()).forEach((threadId) => {
        this.setState(prevState => {
          return { threadIds: [...prevState.threads, threadId] }
        })
      })
    });

  }

  loadThread() {
    //grabs from global state

  }



  render() {
    // const threadIds = this.state.threadIds
    const chatsObject = this.props.chats
    const chatsArray = [];
    Object.keys(chatsObject).forEach((id) => {
      let chat = { id: id, members: chatsObject[`${id}`].members, messages: chatsObject[`${id}`].messages };
      chatsArray.push(chat)
    })


    console.log(this.props);
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'red'}}>

        </View>
        <FlatList
            style={{flex: 1}}
            data={chatsArray}
            renderItem={({item}) => <ThreadPreview navigation={this.props.navigation} item={item}/>}
            keyExtractor={(item, index) => index}
          />

      </View>
    )

    // return (
    //   <FlatList
    //     style={{flex: 1}}
    //     data={threadIds}
    //     renderItem={({item}) => <Text style={{fontSize: 40}}>{item.id}</Text>}
    //     keyExtractor={(item, index) => index}
    //   />
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const mapStateToProps = (state) => ({
  chats: state.chats
});

// const mapDispatchToProps = (dispatch) => ({
//   receiveMessages: (messages) => dispatch(receiveMessages(messages))
// });

export default connect(mapStateToProps)(Messenger);
