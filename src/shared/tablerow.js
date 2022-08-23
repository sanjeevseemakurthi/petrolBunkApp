import React, { useState } from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import Tablecell from "./tablecell";
import Tablecelloption from './tablecelloption';
export default function Tablerow(props) {
    return (
        <>
            <View  style= {[tablestyles.rows, props.rowindex%2 !== 0 ? tablestyles.oddrow :  tablestyles.evenrow]}>
                { 
                    props.columns.map((eachcol,dataindex)=> 
                    <View  key={'data'+ props.rowindex+dataindex} >
                     {eachcol.showselection === undefined  ?
                      <Tablecell celldata = {props.rowdata[eachcol.actualname]} eachcol = {eachcol} changingtabledata = {props.changingtabledata}  rowindex = {props.rowindex} roweditable = {(props.rowdata.roweditable !== undefined) ? props.rowdata.roweditable : true}/>
                      :
                      <Tablecelloption key={'data'+ props.rowindex+dataindex} celldata = {props.rowdata[eachcol.actualname]} eachcol = {eachcol} changingtabledata = {props.changingtabledata}  
                      rowindex = {props.rowindex} optiondata = {eachcol.optiondata} roweditable = {(props.rowdata.roweditable !== undefined) ? props.rowdata.roweditable : true}/>
                    }
                    </View>
                   
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