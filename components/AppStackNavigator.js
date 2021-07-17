import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ReadQueryScreen from '../screens/ReadQueryScreen';
import AdviseScreen  from '../screens/AdviseScreen';




export const AppStackNavigator = createStackNavigator({
  ReadQuery : {
    screen : ReadQueryScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  Advise : {
    screen : AdviseScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'ReadQuery'
  }
);