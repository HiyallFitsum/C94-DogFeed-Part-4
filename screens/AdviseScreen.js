import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import{Card,Header,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';

import db from '../config.js';

export default class AdviseScreen extends Component{
  constructor(props){
    super(props);
    this.state={
    userId                    : firebase.auth().currentUser.email,
    userName                  : "",
    askerId                : this.props.navigation.getParam('details')["user_id"],
    dogBreed                  : this.props.navigation.getParam('details')["dog_breed"],
    dogAge     : this.props.navigation.getParam('details')["dog_age"],
    query     : this.props.navigation.getParam('details')["dog_query"],
    askerName              : '',
    answer: '',
    }
  }



  getAskerDetails(){
    db.collection('users').where('email_id','==',this.state.askerId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          askerName    : doc.data().first_name,
        })
      })
    });

    /*db.collection('dog_queries').where('query_id','==',this.state.queryId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({askerQueryDocId:doc.id})
     })
  })*/
}


  getUserDetails=(userId)=>{
    db.collection("users").where('email_id','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

 /* updateQueryStatus=()=>{
    db.collection('all_answers').add({
      "dog_breed"           : this.state.dogBreed,
      "query_id"          : this.state.queryId,
      "asked_by"        : this.state.askerName,
      "answerer_id"            : this.state.userId,
      "query_status"      :  "answered",
      "answer": this.state.answer
    })
  }*/


  addAnswer=()=>{
    var message = this.state.userName + " has answered this query"
    db.collection("all_answers").add({
      "targeted_user_id"    : this.state.askerId,
      "answerer_id"            : this.state.userId,
      "dog_breed"           : this.state.dogBreed,
      "asked_by"        : this.state.askerName,
      "message"             : message,
      "query_status"      :  "answered",
      "answer_status": "unread",
      "answer": this.state.answer
    })
  }



  componentDidMount(){
    this.getAskerDetails()
    this.getUserDetails(this.state.userId)
  }


    render(){
      return(
    <SafeAreaProvider>
        <View style={styles.container}>
          <View>
            <MyHeader title="Read Query Details" navigation={this.props.navigation}/>
          </View>

    <ScrollView>
    
          <View>
            <Card
                title={"Query Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Dog Breed : {this.state.dogBreed}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Dog Age: {this.state.dogAge}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Query : {this.state.query}</Text>
              </Card>
               <Card>
                <Text style={{fontWeight:'bold'}}>Asker Name: {this.state.askerName}</Text>
              </Card>
            </Card>
          </View>

          <View>
           <Card
              title={"Answer Query"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
          <TextInput
           style={[styles.box,{height: 155}]}
            multiline
            numberOfLines={10}
             onChangeText={text => {
            this.setState({ answer: text });
          }}
            placeholder = "Answer:"
            value = {this.state.answer}/>
              </Card>
            </Card>
         </View>

          <View style={styles.buttonContainer}>
            {
              this.state.askerId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.addAnswer()
                      this.props.navigation.navigate("ReadQuery")
                    }}>
                    
                  <Text>Submit Answer</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
          </ScrollView>
        </View>

     </SafeAreaProvider>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: '#7653b5',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})