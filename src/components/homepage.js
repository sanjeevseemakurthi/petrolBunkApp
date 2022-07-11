import React from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import Table from "../shared/table";
import {getpumps} from "../services/sharedservices"
export default function Homepage() {
  useEffect(()=>{populatedata()},[]);
  async function populatedata() {
    await getpumps().then((res)=>{
      let holddata =[];
      res.data.data.forEach(element => {
        let row = {
          amount:0,
          closing:0,
          netsale:0,
          opening:element.latestclosedreading,
          price:element.price,
          testing:5,
          pumpid: element.id,
          product: element.product,
          tank: element.tank,
        }
        holddata.push(row);
      });
      holddata.forEach(element => {
        element.netsale = element.opening - element.closing - element.testing;
        element.amount =  element.netsale * element.price;
      });
      onchangetabledata(holddata);
    }).catch((err)=>{
      console.log(err)
    })
  }
  let [tabledata, onchangetabledata] = useState([]);
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
]);
let finaldata;
function datachanged(data,rowindex, columnname,value) {
  data[rowindex].total =   data[rowindex].closing - data[rowindex].opening - data[rowindex].testing;
  data[rowindex].amount =  data[rowindex].total * data[rowindex].price;
  onchangetabledata([...tabledata]);
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