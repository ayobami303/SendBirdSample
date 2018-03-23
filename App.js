/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation'

import { Provider } from 'react-redux'
import store from './src/store'

import Login from './src/screens/Login.js'
import Menu from './src/screens/Menu.js'
import Profile from './src/screens/Profile.js'
import OpenChannel from './src/screens/OpenChannel.js'

const MainNavigator = StackNavigator({
  Login: {screen: Login},  
  Menu: {screen: Menu},
  Profile: {screen: Profile},
  OpenChannel: {screen: OpenChannel},
});

// type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}


