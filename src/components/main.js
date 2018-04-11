import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import Messenger from '../components/chats/messenger'
import Profile from '../components/profile/profile'
import Gallery from '../components/deck/gallery'
import Card from '../components/deck/card'

class Main extends React.Component {

  constructor(props){
    super(props)
    this.state = {selectedTab: 'profile'}
  }

  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="user" size={22} color="#666"/>}
          renderSelectedIcon={() => <Icon name="user" size={22} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Profile navigation={this.props.navigation}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'users'}
          title="Gallery"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="users" size={22} color="#666"/>}
          renderSelectedIcon={() => <Icon name="users" size={22} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'users'})}>
          <Gallery navigation={this.props.navigation}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'envelope'}
          title="Messages"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="envelope" size={22} color="#666"/>}
          renderSelectedIcon={() => <Icon name="envelope" size={22} color="#3496f0"/>}
          badgeText="1"
          onPress={() => this.setState({selectedTab: 'envelope'})}>
          <Messenger navigation={this.props.navigation}/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

export default Main
