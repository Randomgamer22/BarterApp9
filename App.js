import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignupLoginScreen from './screens/SignupLoginScreen';
import {AppTabNavigator} from './components/AppTabNavigator';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen: SignupLoginScreen},
  BottomTab:{screen:AppTabNavigator}
});

const AppContainer = createAppContainer(switchNavigator) ;
