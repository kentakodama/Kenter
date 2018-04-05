import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
// import EditAbout from './edit_about';

class AboutMe extends React.Component {


  constructor(props){
    super(props)
  }


  editAbout(){
    const { navigate } = this.props.navigation;
    navigate('EditAbout')
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight onPress={()=> this.editAbout()}
                  style={{flex: 1, width: '100%', backgroundColor: 'purple'}}>
                    <Text style={styles.text}>Edit your profile text</Text>
          </TouchableHighlight>
        <View style={{flex: 4, width: '100%', backgroundColor: 'gray'}}>
          <Text>{this.props.about}</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: 'white'
  }
});

const mapStateToProps = (state) => ({
  about: state.user.about
});

export default connect(mapStateToProps, null)(AboutMe);
