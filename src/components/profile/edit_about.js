import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import * as firebase from 'firebase';


class EditAbout extends React.Component {


  constructor(props){
    super(props)
    let about = this.props.about
    this.state = { info: about };
  }

  handleAboutUpdate(){
    const { navigate } = this.props.navigation;
    var db = firebase.database();

    let id = firebase.auth().currentUser.uid
    console.log(id);

    let userRef = db.ref(`users/${id}`);

    var updates = {};
    updates['about'] = this.state.info
    firebase.database().ref().update(updates);

    navigate('Main')

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{flex: 1, width: '100%', backgroundColor: 'white'}}
                   onChangeText={(info) => this.setState({info})}
                   value={this.state.info} />
        <Button title={'save'} onPress={()=> this.handleAboutUpdate() }/>

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
  }
});

const mapStateToProps = (state) => ({
  about: state.user.about
});

export default connect(mapStateToProps, null)(EditAbout);
