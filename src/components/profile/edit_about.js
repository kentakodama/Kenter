import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import * as firebase from 'firebase';
import * as APIUtil from '../../api_util/api_util'

class EditAbout extends React.Component {


  constructor(props){
    super(props)
    console.log('probably this one', this.props.about);
    this.state = Object.assign({}, this.props.user)
  }

  handleAboutUpdate(){
    const { navigate } = this.props.navigation;
    const user = this.state;

    APIUtil.postUserAboutMe(user); // to db
    this.props.receiveUser(user); // to state
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
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  receiveUser: (id) => dispatch(receiveUser(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditAbout);
