import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect,useContext } from "react";
import Table from "../../shared/table";
import {getpumps,savereadings} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";

export default function Readings({navigation , route}) {
  const [state, setState] = useContext(DaysheetContext);
  const [refresh, refreshstate] = useState(true);
  let date = route.params.dateselected
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getpumps(date).then((res)=>{
      let holddata =[];
      if (res.alreadysaved && res.alreadysaved === true) {
        refreshstate(false);
        columns.forEach(ele=>{
          ele.editable = false;
        })
      }
      setTimeout(() => {
        refreshstate(true);
      }, 1000);
      res.data.data.forEach(element => {
        let row = {
          amount:0,
          closing: element.latestclosedreading,
          netsale:0,
          opening: res.alreadysaved ? element.latestopenreading : element.latestclosedreading,
          price:element.price,
          testing:5,
          pumpid: element.id,
          product: element.product,
          tank: element.tank,
          date : new Date()
        }
        holddata.push(row);
      });
      holddata.forEach(element => {
        element.netsale = element.opening - element.closing - element.testing;
        element.amount =  element.netsale * element.price;
      });
      initialchange(holddata);
      onchangetabledata(holddata);
    }).catch((err)=>{
    })
  }
  function initialchange(data) {
    let amount = 0;
    let test = state
    data.forEach(element => {
      amount = amount + element.amount;
    });
    test.oilsales = amount;
    test.oildata = data;
    setState(test);
  }
  let [tabledata, onchangetabledata] = useState([]);
  let columns = [
    {
    displayname: 'Tank',
    actualname: 'tank',
    type : 'numeric',
    width: 60,
    editable : false
    },
    {
    displayname: 'Opening Redings',
    actualname: 'opening',
    type : 'numeric',
    width: 100,
    editable : true
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
    actualname: 'closing',
    type : 'numeric',
    width: 100,
    editable:true
    },
    {
      displayname: 'Testing',
      actualname: 'testing',
      type : 'numeric',
      width: 100,
      editable:true
    },
    {
      displayname: 'Total lts',
      actualname: 'netsale',
      type : 'numeric',
      width: 100,
      editable:true
    },
    {
      displayname: 'Price',
      actualname: 'price',
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
    },
];
let finaldata;
function datachanged(data,rowindex, columnname,value) {
  data[rowindex].netsale =   data[rowindex].closing - data[rowindex].opening - data[rowindex].testing;
  data[rowindex].amount =  data[rowindex].netsale * data[rowindex].price;
  let amount = 0;
  let test = state
  data.forEach(element => {
    amount = amount + element.amount;
  });
  test.oilsales = amount;
  test.oildata = tabledata;
  setState(test);
  onchangetabledata([...tabledata]);
}
async function submitdata() {
  await savereadings(tabledata).then((res)=>{
  }).catch()
}
    return (
      <View>
      {
        refresh && 
        <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
      }
      </View>
    );
}
const tablestyles = StyleSheet.create({
  container : {
    width :800
  },
})