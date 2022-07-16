import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Table from '../../shared/table';
import { getaccounts} from "../../services/sharedservices"

export default function Perticulars() {
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getaccounts().then((res)=>{
      let holddata =[];
      res.data.data.forEach(element => {
        let row = {
          label: element.name,
          value: element.id
        }
        holddata.push(row);
      });
      
      let columndata = [
        {
        displayname: 'Name',
        actualname: 'name',
        type : 'numeric',
        width: 300,
        editable : false,
        showselection : true,
        optiondata : holddata
        },
        {
        displayname: 'Jama',
        actualname: 'jama',
        type : 'numeric',
        width: 100,
        editable : true
        },
        {
        displayname: 'Karchu',
        actualname: 'karchu',
        type : 'numeric',
        width: 100,
        editable : true
        },
    ];
      onchangecolumns(columndata);
      console.log("hi");
    }).catch((err)=>{
      console.log(err)
    })
  }
  let [tabledata, onchangetabledata] = useState([]);
  let [columns , onchangecolumns] = useState([]);
  function datachanged(data,rowindex, columnname,value) {
    onchangetabledata([...tabledata]);
  }
  async function submitdata() {
    console.log("hiogdh");
    await saveengineoils(tabledata).then((res)=>{
      console.log(res);
    }).catch()
  }
  function addrow() {
    let newrow = {name:-1,jama:0,karchu:0,}
    onchangetabledata([...tabledata,newrow]);
  }
  function removerow() {
    let data =tabledata.splice(-1,1);
    onchangetabledata([...data]);
  }
  return (
    <View>
    <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
    <View >
      <Button title="Addrow" onPress={addrow}/>
      <Button title="Removelastrow" onPress={removerow}/>
    </View>
    <Button title="Submit" onPress={submitdata}/>
    </View>
  );
  };

  const tablestyles = StyleSheet.create({
    container : {
      width :800
    },
  })