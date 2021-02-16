import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignupLoginScreen from './screens/SignupLoginScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen: SignupLoginScreen},
  Drawer:{screen: AppDrawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator) ;
