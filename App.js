/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SlidingPanel from 'react-native-sliding-up-down-panels';

import LogInScreen from './components/LogInScreen';
import MapScreen from './components/MapScreen';

const RootStack = createStackNavigator(
  {
    LogIn: LogInScreen,
    Map: MapScreen,
  },
  {
    initialRouteName: 'LogIn'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff",
    alignItems: "center", 
    justifyContent: "center",
  },

  mapConatiner: {
    flex: 1,
    height: 400,
  },

  map: {
    height: 400,
  },

  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10
  },

  buttonContainer: {
    flexDirection: "row",

  },

  userButton: {
    backgroundColor: "#ffd700",
    width: "45%",
    padding: 15
  },

  buttonText: {
    textAlign: "center",
  },

  slideHeader: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },

  slidingPanelLayoutStyle: {
    width: 100,
    height: 100,
    backgroundColor: '#7E52A0',
    justifyContent: 'center',
    alignItems: 'center'
  },

  mapIconsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});




