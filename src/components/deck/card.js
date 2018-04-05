import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {details: false}
  }



  render () {

    if(this.state.details) {
      return(
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 1, width: '100%', backgroundColor: 'blue'}}
              onPress={()=> this.setState({details:false})}>
              <Text style={styles.text}>Show DEtails</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
        <TouchableOpacity style={{flex: 1, width: '100%', backgroundColor: 'red'}}
            onPress={()=> this.setState({details:true})}>
            <Text style={styles.text}>Hide details</Text>
        </TouchableOpacity>
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
    textAlign: "center",
    color: 'white',
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default Card
