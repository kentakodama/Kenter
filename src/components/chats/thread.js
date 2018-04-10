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
    this.loadMessages()
  }

  loadMessages(){
    this.setState({messages: []})
    const threadId = this.props.navigation.state.params.threadId
    const threadsRef = firebase.database().ref(`threads/${threadId}`);
    threadsRef.on('value', (snapshot) => {
      let messages = snapshot.val().messages
      Object.keys(messages).forEach((message) => {
        this.setState(prevState => {
            return { messages: [...prevState.messages, messages[`${message}`]] }
        })
      })
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

  render() {
    const messages = this.state.messages
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
         <Button style={{flex: 1}}
            onPress={()=> this.sendMessage()}
            title="Learn More"
            color="#841584"/>
      </View>
    )

  }

}

export default Thread
