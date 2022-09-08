import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar ,TextInput, Button } from 'react-native';
import { useState, useEffect } from "react";
import {Authenticateservice} from "../services/sharedservices";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
  let [username, onchangeusername] = useState('');
  let [password, onChangepassword] =useState('');
    return (
        <SafeAreaView style={styles.container}>
          <View style = {styles.parentview}>
              <View style={styles.childviewone}> 
                <Text style = {styles.textheader}>Wlcome to VFS!</Text>
              </View>
              <View style={styles.childviewtwo}>
                <TextInput variant="standard" label="username" style = {styles.textform} onChangeText={onchangeusername} value = {username} placeholder = "username"/>
                <TextInput variant="standard" label="Password" secureTextEntry={true} style = {styles.textform} 
                 onChangeText={onChangepassword} value = {password} placeholder = "password" />
                <Button
                    onPress={() =>submitted()}
                    title="Submit"
                    color="#511be3"
                    accessibilityLabel="Learn more about this purple button"
                  />
              </View>
          </View>
        </SafeAreaView>
    );
    async function submitted() {
      let payload = {
        'username' : username,
        'password': password
      }
      const data =  await Authenticateservice(payload).then((res)=>{
        AsyncStorage.setItem('Token', res.data.jwtToken);
        AsyncStorage.setItem('role', res.data.role);
        props.changestate(true);
      }).catch((err)=>{})
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    parentview:{
      flex: 1,
      color:'rgb(255, 0, 255)',
      backgroundColor: '#511be3',
      alignContent: 'center',
      alignItems: 'center',
      width:'100%'
    },
    childviewone :{
      flex: 1,
      color:'rgb(0, 0, 0)',
      backgroundColor: '#511be3',
      alignItems: 'center',
      width:'100%',
      justifyContent : "center"
    },
    childviewtwo :{
      flex: 2,
      color:'rgb(0, 0, 0)',
      backgroundColor: '#ffffff',
      alignContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius :60,
      borderTopRightRadius : 60,
      justifyContent : "center",
      width:'100%'
    },
    textheader: {
      fontSize: 25,
      fontWeight: '500',
      color : '#ffffff'
    },
    textform : {
      width: '70%',
      margin: 10,
      borderRadius: 10,
      borderWidth:1,
      padding:10
    }

  });