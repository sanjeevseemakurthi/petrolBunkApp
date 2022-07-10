import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import Table from "../shared/table";
export default function Homepage() {
  let [columns , onchangecolumns] = useState([
    {
    displayname: 'Tank',
    actualname: 'tank',
    type : 'numeric',
    width: 60,
    editable : false
    },
    {
    displayname: 'Opening Redings',
    actualname: 'openingredings',
    type : 'numeric',
    width: 100,
    editable : false
    },
    {
    displayname: 'Product',
    actualname: 'product',
    type : 'default',
    width: 60,
    editable : false
    },
    {
    displayname: 'Closing Reding',
    actualname: 'closingredings',
    type : 'numeric',
    width: 100,
    editable:true
    },
]);
let [tabledata, onchangetabledata] = useState([
  {
    tank:'1' ,
    openingredings:'26565',
    product: 'HSD',
    closingredings : '65565'
  },
  {
    tank:'2',
    openingredings:'26565',
    product: 'HSD',
    closingredings : '65565'
  }
]);
let finaldata;
function datachanged(data) {
  finaldata =  data;
}
    return (
      <>
        <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
      </>
    );
}
const tablestyles = StyleSheet.create({
  container : {
    width :800
  },
})