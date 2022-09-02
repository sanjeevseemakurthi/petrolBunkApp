import React from "react";
import { StyleSheet, Text, Button,View } from 'react-native';
import DatePickerTest from '../../shared/datepickertest'
import { useState, useEffect } from "react";
import {getpericulardetails} from '../../services/sharedservices'

export default function Perticulardetails({navigation,route}) {

  const [filterdata, filterdatarefresh] = useState([]);
  const [actualdata, actualdatarefresh] = useState([]);
  const [pertucalardetails, pertucalardetailschange] = useState([]);
  const [filtersumjama, changefiltersumjama] = useState(0);
  const [filtersumkarchu, changefiltersumkarchu] = useState(0);

  const date1 = new Date();
  const date2 = new Date();
  date1.setDate(date1.getDate() - 30)
  useEffect(()=>{
    populatedata()
  },[]);
  async function populatedata() {
    console.log(route.params.id)
    await getpericulardetails({id: route.params.id}).then(res=>{ 
      actualdatarefresh(res.data.data);
      pertucalardetailschange(res.data.accinfo);
      setTimeout(() => {
        filterbydate(res.data.data); 
      }, 100);
    }).catch(err=>{});
  }
  function initaldatechanged(date) {
        date1 = new Date(date.data.spli('-'));
        filterbydate(actualdata);
  }
  function finaldatechanged(date) {
        date2 = new Date(date.data.spli('-'));
        filterbydate(actualdata);
  }
  function filterbydate(datatofilter) {
    let jama = 0;
    let karchu = 0;
    let data = datatofilter.filter(res=>{
        if (new Date(res.date.split('-')) < date2 && new Date(res.date.split('-')) > date1) 
        { jama = jama + res.jama;
         karchu = karchu + res.karchu;
         return true;
        }
         else 
         return false;
    })
    filterdatarefresh([...data]);
  }
  return (
    <>
    <View style = {{flexDirection : 'row',marginTop:10 ,justifyContent:"space-evenly"}}>
        <Button title="Back" onPress={()=>{navigation.push('Accounts')}}></Button>
        <DatePickerTest datechanged = {initaldatechanged} buttontitle = "satrt Date" initaldate = {date1}></DatePickerTest>
        <DatePickerTest datechanged = {finaldatechanged} buttontitle = "End Date " initaldate = {date2}></DatePickerTest>
    </View>
    {
     filterdata .map((data,index)=> 
     <View key={'data'+index}>
          <Banner  discription = {data} accouninfo = {pertucalardetails}/>
     </View>
     )}
    </>
  );
}

function Banner(test) {
  let params = test.discription;
    return(
      <View style = {{flexDirection : 'row', padding: 10, margin:10, borderWidth:1,justifyContent:"space-evenly"}}>
      <Text> {test.accouninfo}</Text>
      <Text> {params.jama}</Text>
      <Text>{ params.karchu }</Text>
      </View>
    );
  }