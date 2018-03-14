import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import * as firebase from 'firebase';
import * as APIUtil from '../../api_util/api_util'
import { receiveUser } from '../../actions/user_actions'
class EditAbout extends React.Component {


  constructor(props){
    super(props)
    this.state = Object.assign({}, this.props.user)
    console.log('props', this.props.user);
    console.log('state', this.state);
  }

  handleAboutUpdate(){
    const { navigate } = this.props.navigation;
    const user = this.state;
    console.log('this.props.receiveUser', this.props.receiveUser);
    APIUtil.postUserAboutMe(user); // to db
    this.props.receiveUser(user); // to state
    navigate('Main')

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{flex: 1, width: '100%', backgroundColor: 'white'}}
                   onChangeText={(about) => this.setState({about})}
                   value={this.state.about} />
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
  receiveUser: (user) => dispatch(receiveUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditAbout);
