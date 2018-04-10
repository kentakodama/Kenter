import React from 'react';
import { StyleSheet,TouchableOpacity, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';


class ThreadPreview extends React.Component {

  constructor(props){
    super(props)

  }


  render() {
    const { navigate } = this.props.navigation;
    return(
      <TouchableOpacity
          onPress={()=> navigate('Thread', {threadId: this.props.item})}
          style={{backgroundColor: 'yellow', height: 40}}>
        <Text>{this.props.item}</Text>
      </TouchableOpacity>
    )

  }

}

export default ThreadPreview
