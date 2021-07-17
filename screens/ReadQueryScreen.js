import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class ReadQueryScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      dogQueriesList : []
    }
  this.queryRef= null
  }

  getDogQueriesList =()=>{
    this.queryRef = db.collection("dog_queries")
    .onSnapshot((snapshot)=>{
      var dogQueriesList = snapshot.docs.map((doc) => doc.data())
      alert()
      this.setState({
        dogQueriesList : dogQueriesList
      });
    })
  }

  componentDidMount(){
    this.getDogQueriesList()
  }

  componentWillUnmount(){
    this.queryRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.dog_breed}
        subtitle={item.dog_age}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress ={()=>{
                this.props.navigation.navigate("Advise",{"details": item})
              }}
            >
              <Text style={{color:'#dbd1f0'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
    <SafeAreaProvider>
      <View style={{flex:1, backgroundColor: "#a77ef2"}}>
        <MyHeader title="Read Dog Queries" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.dogQueriesList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Dog Queries</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.dogQueriesList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#7653b5",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
