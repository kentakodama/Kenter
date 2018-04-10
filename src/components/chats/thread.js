import React from 'react';
import { StyleSheet, Button, TextInput, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';
import Message from './message'

class Thread extends React.Component {

  constructor(props){
    super(props)
    this.state = { messages:[], text: ''  };
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

  render() {
    const messages = [];
    const threadId = this.props.navigation.state.params.threadId
    const threadsRef = firebase.database().ref(`threads/${threadId}`);
    threadsRef.on('value', (snapshot) => {
      let loadedMessages = snapshot.val().messages
      Object.keys(loadedMessages).forEach((message) => {
        messages.push(loadedMessages[`${message}`])
      })
    });

    return(
      <View style={{flex: 1}}>
        <FlatList
            style={{flex: 1}}
            data={messages}
            renderItem={({item}) => <Message data={item}/>}
            keyExtractor={(item, index) => index}
          />

          <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
         <Button style={{flex: 4}}
            onPress={()=> this.sendMessage()}
            title="Learn More"
            color="#841584"/>
      </View>
    )

  }

}

export default Thread
