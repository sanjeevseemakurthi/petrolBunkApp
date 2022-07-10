import React, { useState } from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import Tablerow from "./tablerow";
export default function Table(props) {
    let tabledata = props.tabledata;
    let columns = props.columns;
    function changingtabledata(rowindex, columnname,value) { 
      tabledata[rowindex][columnname] = value;
      props.datachanged(tabledata);
    }
    
    return (
      <>
      <ScrollView horizontal={true}>
        <View style = {tabledata.container}>
          <View style= {tablestyles.rows} >
              {
              columns.map((data,index)=>
              <Text  style={[tablestyles.input, {width : data.width}]} key = {'Head'+index}>
                  {data.displayname}
              </Text>
              )}
          </View>
          <View>
              {
              tabledata.map((eachdata,rowindex)=>
                <Tablerow key={'data'+rowindex} rowdata = {eachdata} rowindex = {rowindex} columns = {columns} changingtabledata = {changingtabledata}/>
              )}
          </View>
        </View>
      </ScrollView>
      <View>
        <Text>{tabledata | JSON}</Text>
        <Button title="click me " onPress={()=>{
          console.log(tabledata)
        }}></Button>
      </View>
  </>
    );
}
const tablestyles = StyleSheet.create({
  container : {
    width :800
  },
  rows: {
    flexDirection: "row",  
  },
  oddrow: {
    backgroundColor : '#ebebeb'
  },
  evenrow:{
    backgroundColor : '#f7f5f5'
  },
  input: {
    borderWidth: 1,
    alignItems: "center",
    textAlign : "center",
    padding: 10
  }
})