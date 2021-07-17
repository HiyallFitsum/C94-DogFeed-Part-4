import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';

import firebase from 'firebase';
import db from '../config';

export default class WriteQueryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      dogBreed: '',
      dogAge: null,
      dogQuery: '',
    };
  }

  addQuery = () => {
    db.collection('dog_queries').add({
      user_id: this.state.userId,
      dog_breed: this.state.dogBreed,
      dog_age: this.state.dogAge,
      dog_query: this.state.dogQuery,
      query_status: 'queried',
    });

    this.setState({
      dogBreed: '',
      dogAge: null,
      dogQuery: '',
    });

    return Alert.alert('Dog Query Submitted Successfully');
  };

  render() {
    return (
  
        <View style={styles.container}>
          <MyHeader title="Write Query" navigation={this.props.navigation} />
  
  
          <KeyboardAvoidingView>
            <TextInput
              style={styles.box}
              onChangeText={(text) => {
                this.setState({ dogBreed: text });
              }}
              placeholder="Dog Breed:"
              value={this.state.dogBreed}
            />
          
            <TextInput
              style={styles.box}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({ dogAge: text });
              }}
              placeholder="Dog Age (Years):"
              value={this.state.request}
            />

            <TextInput
              style={[styles.box, { height: 155 }]}
              multiline
              numberOfLines={10}
              onChangeText={(text) => {
                this.setState({ dogQuery: text });
              }}
              placeholder="Query:"
              value={this.state.dogQuery}
            />

          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.addQuery()}}>
          <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a77ef2',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 40,
    marginTop: 30,
    borderBottomWidth: 1.5,
    borderColor: '#7e38ff',
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  button: {
    width: 200,
    height: 75,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#7653b5",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20
  }
});
