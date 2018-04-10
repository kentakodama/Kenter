import React from 'react';
import { StyleSheet, FlatList, Text, View} from 'react-native';
import firebase from '../../firebase';


class Thread extends React.Component {

  constructor(props){
    super(props)
    this.state = { threadIds:[] };
  }


  render() {
    console.log(this.props);
    return(
      <View style={{backgroundColor: 'yellow', height: 40}}>
        <Text>{this.props.item}</Text>
      </View>
    )

  }

}

export default Thread
