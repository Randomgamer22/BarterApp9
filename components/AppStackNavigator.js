import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ItemDonateScreen from '../screens/ItemDonateScreen';
import ReceiverDetailsScreen  from '../screens/ReceiverDetailsScreen'


export const AppStackNavigator = createStackNavigator({
  ItemDonateList : {
    screen : ItemDonateScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : ReceiverDetailsScreen,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'ItemDonateList'
  }
);