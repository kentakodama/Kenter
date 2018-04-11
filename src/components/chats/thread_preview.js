import React from 'react';
import { StyleSheet,TouchableOpacity, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';


class ThreadPreview extends React.Component {

  constructor(props){
    super(props)

  }


  render() {
    const { navigate } = this.props.navigation;
  console.log('  this.props.thread', this.props.thread);
    return(
      <TouchableOpacity
          onPress={()=> navigate('Thread', {thread: this.props.thread})}
          style={{backgroundColor: 'yellow', height: 40}}>
        <Text>{this.props.thread.members[0]}</Text>
      </TouchableOpacity>
    )

  }

}

export default ThreadPreview
