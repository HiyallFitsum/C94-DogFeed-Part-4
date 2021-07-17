import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
    }
  }

  render(){
    return(
        <Header
          centerComponent={{ text: this.props.title, style: { color: '#692ed9', fontSize:20,fontWeight:"bold", } }}
          backgroundColor = "#a839db"
        />

)
}

}