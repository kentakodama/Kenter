import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';
import Message from './message'

class Thread extends React.Component {

  constructor(props){
    super(props)
    this.state = { messages:[], text: ''  };
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  componentWillMount(){
    // this.loadMessages()
  }

  loadMessages(){

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

  scrollToEnd() {
    this.flatListRef.scrollToEnd({animated: false});
  }


  render() {
    let messages = [];
    const threadId = this.props.navigation.state.params.threadId
    const threadsRef = firebase.database().ref(`threads/${threadId}`);
    threadsRef.on('value', (snapshot) => {

      console.log('change in db');
      let loadedMessages = snapshot.val().messages
      Object.keys(loadedMessages).forEach((message) => {
        messages.push(loadedMessages[`${message}`])
      })
    });

    messages.sort((a, b) => a.timeStamp - b.timeStamp)

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">

        <FlatList
            style={{flex: 1}}
            ref={ref => { this.flatListRef = ref; }}
            onContentSizeChange={this.scrollToEnd}
            data={messages}
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

export default Thread
