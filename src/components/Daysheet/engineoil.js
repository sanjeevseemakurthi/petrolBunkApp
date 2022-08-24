import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect,useContext} from "react";
import Table from "../../shared/table";
import {getengineoils,saveengineoils} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";

export default function Engineoil({navigation , route}) {
  const [state, setState] = useContext(DaysheetContext);
  let [tabledata, onchangetabledata] = useState([]);
  let [columns , onchangecolumns] = useState([])
  let testcolumns = [
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
    actualname: 'purchase',
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
];
  let  formattedToday = "";
  let date = route.params.dateselected
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getengineoils(date).then((res)=>{
      let noneditablecols = [ 'name', 'qtyinitial','qtyleft'];
      testcolumns.forEach(element => {
        if (!noneditablecols.includes(element.actualname) && res.data.alreadysaved !== true) {
          element.editable = true
        } else {
          element.editable = false
        }
      });
      onchangecolumns(testcolumns);
      let holddata =[];
      res.data.data.forEach(element => {
        let existdata = undefined
        if (res.data.alreadysaved) {
          let testexistdata = res.data.engineoils.findIndex(eachoils=>{ if(eachoils.eid === element.id) return true; else false});
          existdata = res.data.engineoils[testexistdata];
        }
        let row = {
             date       : new Date(),
             qtyleft    : existdata ? existdata.qtyleft.toString() : element.qtyleft.toString(),
             qtyinitial : existdata ? (existdata.qtyleft + existdata.sales - existdata.purchase ) :element.qtyleft.toString(),
             sales      : existdata ? existdata.sales.toString() : '0',
             purchase   : existdata ? existdata.purchase.toString() :'0',
             rate       : existdata ? existdata.rate.toString() : '0',
             amount     : existdata ? existdata.amount.toString(): '0',
             eid        : element.id,
             name       : element.name
        }
        holddata.push(row);
      });
      initialcahnge(holddata);
      onchangetabledata(holddata);
      
    }).catch((err)=>{
    })
  }
let finaldata;
function datachanged(data,rowindex, columnname,value) {
  data[rowindex].qtyleft =  ( parseInt(data[rowindex].qtyinitial) - parseInt(data[rowindex].sales) + parseInt(data[rowindex].purchase)).toString();
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