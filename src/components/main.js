import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
// import { TabNavigator } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';

import Messenger from '../components/chats/messenger'
import SwipePage from '../components/deck/swipe_page'
import Profile from '../components/profile/profile'

class Main extends React.Component {

  constructor(props){
    super(props)
    this.state = {selectedTab: 'Messenger'}
  }

  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          // selectedTitleStyle={{color: "#3496f0"}}
          // renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
          // renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
          badgeText="1"
          onPress={() => this.setState({selectedTab: 'home'})}>
          <Messenger/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          // selectedTitleStyle={{color: "#3496f0"}}
          // renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
          // renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Profile/>
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
