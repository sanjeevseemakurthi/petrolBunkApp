import React, { useState } from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import Tablecell from "./tablecell";

export default function Tablerow(props) {
    return (
        <>
            <View  style= {[tablestyles.rows, props.rowindex%2 !== 0 ? tablestyles.oddrow :  tablestyles.evenrow]}>
                { 
                    props.columns.map((eachcol,dataindex)=>
                      <Tablecell key={'data'+ props.rowindex+dataindex} celldata = {props.rowdata[eachcol.actualname]} eachcol = {eachcol} changingtabledata = {props.changingtabledata}  rowindex = {props.rowindex}/>
                   )
                }
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