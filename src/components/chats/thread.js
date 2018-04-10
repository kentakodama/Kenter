import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';
import Message from './message'
import { receiveMessages } from '../../actions/chats_actions'

class Thread extends React.Component {

  constructor(props){
    super(props)
    this.state = { text: ''  };
    // this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  componentWillMount(){
    this.loadMessages()
  }

  loadMessages(){
    const threadId = this.props.navigation.state.params.threadId
    const threadsRef = firebase.database().ref(`threads/${threadId}`);
    threadsRef.on('value', (snapshot) => {
      console.log('change in db', snapshot.val());
      let loadedMessages = snapshot.val().messages
      if(!loadedMessages || loadedMessages.length === 0) { return }
      this.props.receiveMessages(Object.values(snapshot.val().messages))
    });

  }


  sendMessage(){
    const threadId = this.props.navigation.state.params.threadId
    const message = this.state.text
    const name = firebase.auth().currentUser.displayName
    const time = Date.now()

    firebase.database().ref(`threads/${threadId}/messages`).push({
            author: `${name}`,
            message: `${message}`,
            timeStamp: `${time}`
          });
    this.setState({text: ''})
  }

  // scrollToEnd() {
  //   if(this.props.messages.length === 0) { return }
  //   this.flatListRef.scrollToEnd({animated: false});
  // }


  render() {

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">

        <FlatList
            style={{flex: 1}}
            data={this.props.messages}
            renderItem={({item}) => <Message data={item}/>}
            keyExtractor={(item, index) => index}
          />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput
           style={{flex: 4, height: 40, borderColor: 'gray', borderWidth: 1}}
           onChange={this.scrollToEnd}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
         <TouchableOpacity style={{flex: 1, backgroundColor: 'blue'}}
            onPress={()=> this.sendMessage()}
          ><Text style={{color: 'white', fontSize: 40}}>Submit</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )

  }

}


const mapStateToProps = (state) => ({
  messages: state.chats
});

const mapDispatchToProps = (dispatch) => ({
  receiveMessages: (messages) => dispatch(receiveMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
