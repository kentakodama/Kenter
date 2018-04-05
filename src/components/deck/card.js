import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {details: false}
  }



  render () {

    if(this.state.details) {
      return(
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 4, width: '100%', backgroundColor: 'blue'}}
              onPress={()=> this.setState({details:false})}>
              <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.profile.photoURL}}/>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.profile.name}</Text>
          <Text style={styles.text}>{this.props.profile.about}</Text>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 4, width: '100%', backgroundColor: 'red'}}
              onPress={()=> this.setState({details:true})}>
              <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.profile.photoURL}}/>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.profile.name}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    flex: 1,
    textAlign: "center",
    color: 'black',
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default Card
