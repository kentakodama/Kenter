import React from 'react';
import { StyleSheet, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';
import Thread from './thread'
import ThreadPreview from './thread_preview'

class Messenger extends React.Component {

  constructor(props){
    super(props)
    this.state = { threadIds:[] };
  }

  componentWillMount() {
    this.loadThreadIds();
  }

  loadThreadIds() {
    const currentUser = firebase.auth().currentUser
    const threadsRef = firebase.database().ref(`users/${currentUser.uid}/threads`);
    threadsRef.on('value', (snapshot) => {
      Object.keys(snapshot.val()).forEach((threadId) => {
        this.setState(prevState => {
          return { threadIds: [...prevState.threadIds, threadId] }
        })
      })
    });

  }

  loadThread() {

  }



  render() {
    const threadIds = this.state.threadIds
    console.log(this.props);
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'red'}}>

        </View>
        <FlatList
            style={{flex: 1}}
            data={threadIds}
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

export default Messenger
