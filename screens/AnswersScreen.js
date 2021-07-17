import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SafeAreaProvider} from 'react-native-safe-area-context';


import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import db from '../config';

export default class AnswersScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allAnswers : []
    };

    this.answerRef = null
  }

  getAnswers=()=>{
    this.answerRef = db.collection("all_answers")
    .where("answer_status", "==", "unread")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allAnswers =  []
      snapshot.docs.map((doc) =>{
        var answer = doc.data()
        answer["doc_id"] = doc.id
        allAnswers.push(answer)
      });
      this.setState({
          allAnswers : allAnswers
      });
    })
  }

  componentDidMount(){
    this.getAnswers()
  }

  componentWillUnmount(){
    this.answerRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
    <SafeAreaProvider>
        <ListItem
          key={index}
          title={item.dog_breed}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={item.message}
          bottomDivider
        />
     </SafeAreaProvider>
      )
 }


  render(){
    return(
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Answers"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allAnswers.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no Answers</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allAnswers={this.state.allAnswers}/>
            )
          }
        </View>
      </View>
    </SafeAreaProvider>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1, 
    backgroundColor: "#a77ef2"
  }
})
