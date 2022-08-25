import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect,useContext } from "react";
import Table from "../../shared/table";
import {getpumps,savereadings} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";

export default function Readings({navigation , route}) {
  const [state, setState] = useContext(DaysheetContext);
  const [refresh, refreshstate] = useState(true);
  const [columns, changecolumns] = useState([true]);
  let date = route.params.dateselected
  let testcolumns = [
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
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    await getpumps(date).then((res)=>{
      let holddata =[];
      refreshstate(false);
      let noneditablecols = [ 'tank', 'opening','product','netsale','price','amount'];
      testcolumns.forEach(element => {
        if (!noneditablecols.includes(element.actualname) && res.data.alreadysaved !== true) {
          element.editable = true
        } else {
          element.editable = false
        }
      });
      setTimeout(() => {
        refreshstate(true);
      }, 1000);
      res.data.data.forEach(element => {
        let existdata = undefined
        if (res.data.alreadysaved) {
          let testexistdata = res.data.readings.findIndex(eachreading=>{ if(eachreading.pumpid === element.id) return true; else false});
          existdata = res.data.readings[testexistdata];
        }
        let row = {
          amount  : '0',
          closing : existdata ? existdata.closing.toString()  : element.latestclosedreading.toString(),
          netsale : '0',
          opening : existdata ? existdata.opening.toString() : element.latestclosedreading.toString(),
          price   : existdata ? existdata.price.toString() :element.price.toString(),
          testing : existdata ? existdata.testing.toString(): '5',
          pumpid  : element.id,
          product : element.product,
          tank    : element.tank,
          date    : new Date()
        }
        holddata.push(row);
      });
      holddata.forEach(element => {
        element.netsale = (-parseInt(element.opening) + parseInt(element.closing) - parseInt(element.testing)).toString();
        element.amount =  (parseInt(element.netsale) * parseInt(element.price)).toString();
      });
      initialchange(holddata);
      onchangetabledata(holddata);
      changecolumns([...testcolumns]);
    }).catch((err)=>{
    })
  }
  function initialchange(data) {
    let amount = 0;
    let test = state
    data.forEach(element => {
      amount = amount + parseInt(element.amount);
    });
    test.oilsales = amount.toString();
    test.oildata = data;
    setState(test);
  }
  let [tabledata, onchangetabledata] = useState([]);
function datachanged(data,rowindex, columnname,value) {
  data[rowindex].netsale = (parseInt(data[rowindex].closing) - parseInt(data[rowindex].opening) - parseInt(data[rowindex].testing)).toString();
  data[rowindex].amount =  (parseInt(data[rowindex].netsale) * parseInt(data[rowindex].price)).toString();
  let amount = 0;
  let test = state
  data.forEach(element => {
    amount = amount + parseInt(element.amount);
  });
  test.oilsales = amount.toString();
  test.oildata = tabledata;
  setState(test);
  onchangetabledata([...tabledata]);
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