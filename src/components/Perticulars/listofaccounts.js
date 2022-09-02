import React from "react";
import { StyleSheet, Text, Button,Pressable,TextInput, View } from 'react-native';
import { getonlyaccounts } from "../../services/sharedservices";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";


export default function Listofaccounts({navigation,route }) {
    let [tabledata, onchangetabledata] = useState([]);
    let [tableactualdata,onchangeactualdata] =  useState([]);
    let [searchtext,onchangetext] = useState([]);
    useEffect(()=>{
        populatedata()
      },[]);
    async function populatedata() {
        await getonlyaccounts().then((res)=>{
            onchangeactualdata(res.data.data);
            onchangetabledata(res.data.data);
        }).catch();
    }
    function changsearch(value) {
        onchangetext(value);
        let filterdata = tableactualdata.filter(res=>{
            if(!res.name.toLowerCase().search(value.toLowerCase()) || res.name === '')
             return true; 
             else return false
        });
        onchangetabledata([...filterdata]);
    }
    return (
        <>
         <TextInput
          style={{backgroundColor:'rgb(255,255,255)', borderWidth:1,margin:2,padding:2}} 
          onChangeText = {changsearch}
          value={searchtext} 
          />
        <ScrollView>
          {tabledata.map((data,index)=>
            <Pressable style = {listofaccountstyle.pressablestylest}
            onPress = {()=>{navigation.push('Detailed',{id : data.id})}} key = {data.id + 'detailed'}
            >
                <Text> {data.name} </Text>
                <Text> {data.balance} </Text>
            </Pressable>)}
        </ScrollView>
        </>
    );
}
const listofaccountstyle = StyleSheet.create({
    pressablestylest: {
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      textAlign : "center",
      height: 50,
      margin:2,
      justifyContent: "space-evenly"
    }
  })