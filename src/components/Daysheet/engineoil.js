import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect,useContext} from "react";
import Table from "../../shared/table";
import {getengineoils,saveengineoils} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";

export default function Engineoil() {
  const [state, setState] = useContext(DaysheetContext);
  let  formattedToday = "";
  console.log(state);
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getengineoils().then((res)=>{
      let holddata =[];
      res.data.data.forEach(element => {
        let row = {
             date :  new Date(),
             qtyleft: element.qtyleft,
             qtyinitial: element.qtyleft,
             sales: 0,
             Purchase: 0,
             rate:0,
             amount: 0,
             eid: element.id,
             name:element.name
        }
        holddata.push(row);
      });
      onchangetabledata(holddata);
    }).catch((err)=>{
      console.log(err)
    })
  }
  let [tabledata, onchangetabledata] = useState([]);
  let [columns , onchangecolumns] = useState([
    {
    displayname: 'Name',
    actualname: 'name',
    type : 'sentences',
    width: 60,
    editable : false
    },
    {
    displayname: 'Initial QTY',
    actualname: 'qtyinitial',
    type : 'numeric',
    width: 100,
    editable : false
    },
    {
    displayname: 'Qtyleft',
    actualname: 'qtyleft',
    type : 'numeric',
    width: 100,
    editable : true
    },
    {
    displayname: 'Sales',
    actualname: 'sales',
    type : 'default',
    width: 60,
    editable : true
    },
    {
    displayname: 'Purchase',
    actualname: 'Purchase',
    type : 'numeric',
    width: 100,
    editable:true
    },
    {
      displayname: 'Rate',
      actualname: 'rate',
      type : 'numeric',
      width: 100,
      editable:true
    },
    {
      displayname: 'Amount',
      actualname: 'amount',
      type : 'numeric',
      width: 100,
      editable:true
    }
]);
let finaldata;
function datachanged(data,rowindex, columnname,value) {
  data[rowindex].qtyleft =   parseInt(data[rowindex].qtyinitial) - parseInt(data[rowindex].sales) + parseInt(data[rowindex].Purchase);
  onchangetabledata([...tabledata]);
}
async function submitdata() {
  console.log("hiogdh");
  await saveengineoils(tabledata).then((res)=>{
    console.log(res);
  }).catch()
}
    return (
      <View>
      <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
      <Button title="Submit" onPress={submitdata}/>
      </View>
    );
}
const tablestyles = StyleSheet.create({
  container : {
    width :800
  },
})