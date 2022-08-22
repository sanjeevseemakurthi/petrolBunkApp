import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect,useContext} from "react";
import Table from "../../shared/table";
import {getengineoils,saveengineoils} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";

export default function Engineoil({navigation , route}) {
  const [state, setState] = useContext(DaysheetContext);
  let [tabledata, onchangetabledata] = useState([]);
  let  formattedToday = "";
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getengineoils().then((res)=>{
      let holddata =[];
      res.data.data.forEach(element => {
        let row = {
             date :  new Date(),
             qtyleft: element.qtyleft.toString(),
             qtyinitial: element.qtyleft.toString(),
             sales: (0).toString(),
             Purchase: (0).toString(),
             rate:(0).toString(),
             amount: (0).toString(),
             eid: element.id,
             name:element.name
        }
        holddata.push(row);
      });
      initialcahnge(holddata);
      onchangetabledata(holddata);
      
    }).catch((err)=>{
    })
  }
  
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
  data[rowindex].qtyleft =  ( parseInt(data[rowindex].qtyinitial) - parseInt(data[rowindex].sales) + parseInt(data[rowindex].Purchase)).toString();
  onchangetabledata([...tabledata]);
  initialcahnge([...tabledata])
}
function initialcahnge(data) {
  let amount = 0;
  let test = state
  data.forEach(element => {
    amount = amount + parseInt(element.amount);
  });
  test.engineoilsales = amount;
  test.engineoildata = data;
  setState(test);
}
    return (
      <View>
      <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
      </View>
    );
}
const tablestyles = StyleSheet.create({
  container : {
    width :800
  },
})