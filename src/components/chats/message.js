import React from 'react';
import { StyleSheet, FlatList, Text, View} from 'react-native';

class Message extends React.Component {

  constructor(props){
    super(props)
  }



  render() {
    const data = this.props.data
    return(
      <View style={{backgroundColor: 'yellow', height: 40}}>
        <Text style={{fontSize: 20}}>{data.message}</Text>
        <Text style={{fontSize: 10}}>{data.author}</Text>
      </View>

    )

  }

}

export default Message
