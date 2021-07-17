import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { AppStackNavigator } from './AppStackNavigator'
import WriteQueryScreen from '../screens/WriteQueryScreen';
import AnswersScreen from '../screens/AnswersScreen';


export const AppTabNavigator = createBottomTabNavigator({
   WriteQuery: {
    screen: WriteQueryScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/write_Image_DOGFEED_app.PNG")} style={{width:20, height:20}}/>,
      tabBarLabel : "Dog Query",
    }
  },
  ReadQuery: {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/read_DOGFEED_app.PNG")} style={{width:20, height:20}}/>,
      tabBarLabel : "Lend Advice",
    }
  },
   Answers: {
    screen: AnswersScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/answer_IMAGE_dogFeed.PNG")} style={{width:20, height:20}}/>,
      tabBarLabel : "Query Answers",
    }
  },
});

