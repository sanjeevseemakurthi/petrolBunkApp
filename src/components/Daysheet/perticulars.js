import React, { useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Table from '../../shared/table';
import { getaccounts, saveperticulars} from "../../services/sharedservices";
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Perticulars({navigation , route}) {
  const [state, setState] = useContext(DaysheetContext);
  let [tabledata, onchangetabledata] = useState([]);
  let [columns , onchangecolumns] = useState([]);
  let [cashleft , cashchange] = useState([]);
  let [options , newoptions] = useState([]);
  let holddata = [];
  useEffect(()=>{
      populatedata();
  },[])
  useEffect(()=>{
    if(tabledata !== []) {
      let chanedata = tabledata;
      console.log(tabledata,holddata,options);
      options.forEach(element => {
        
        if ( element.label === 'oilsales') {
           let index = chanedata.findIndex((ele)=>{
            if (ele.accountid === element.value) {
              return true;
            } else {
              return false;
            }
          })
          chanedata[index].jama = state.oilsales;
        }
      if ( element.label === 'engineoilsales') {
        let index = chanedata.findIndex((ele)=>{
          if (ele.accountid === element.value) {
            return true;
          } else {
            return false;
          }
        })
        chanedata[index].jama = state.engineoilsales
      }
    });
    onchangetabledata([...chanedata]);
    datachanged(tabledata,0,0,0)
    }
  },[state.oilsales,state.engineoilsales])    
  
  async function populatedata() {
    await getaccounts().then((res)=>{
      holddata =[];
      let holdtabledata = [];
      res.data.data.forEach(element => {
        let row = {
          label: element.name,
          value: element.id
        }
        holddata.push(row);
        if ( element.name === 'cash') {
          let newrow = {accountid: element.id ,discription:'',jama:element.balance,karchu:0,date: new Date()}
          holdtabledata.push(newrow);
        }
        if ( element.name === 'oilsales') {
          let newrow = {accountid: element.id ,discription:'',jama:state.oilsales,karchu:0,date: new Date()}
          holdtabledata.push(newrow);
        }
        if ( element.name === 'engineoilsales') {
          let newrow = {accountid: element.id ,discription:'',jama:state.engineoilsales,karchu:0,date: new Date()}
          holdtabledata.push(newrow);
        }
      });
      newoptions(holddata);
      onchangetabledata(holdtabledata);
      let cashremaining = 0;
      holdtabledata.forEach(element => {
        cashremaining = cashremaining + parseInt(element.jama) - parseInt(element.karchu);
      });
      cashchange(cashremaining);
      let columndata = [
        {
        displayname: 'Name',
        actualname: 'accountid',
        type : 'numeric',
        width: 300,
        editable : false,
        showselection : true,
        optiondata : holddata
        },
        {
          displayname: 'Discription',
          actualname: 'discription',
          type : 'word',
          width: 100,
          editable : true
        },
        {
        displayname: 'Jama',
        actualname: 'jama',
        type : 'numeric',
        width: 100,
        editable : true
        },
        {
        displayname: 'Karchu',
        actualname: 'karchu',
        type : 'numeric',
        width: 100,
        editable : true
        },
    ];
      onchangecolumns(columndata);
    }).catch((err)=>{
    })
  }
 
  
  function datachanged(data,rowindex, columnname,value) {
    let test = state;
   
    setState(test);
    let cashremaining = 0;
    data.forEach(element => {
      cashremaining = cashremaining +  parseInt(element.jama) - parseInt(element.karchu);
    });
    test.cash = cashremaining;
    test.perticularsdata = data;
    cashchange(cashremaining);
    onchangetabledata([...data]);
  }
  function addrow() {
    let newrow = {accountid:-1,discription:'',jama:0,karchu:0,date:  new Date()}
    onchangetabledata([...tabledata,newrow]);
  }
  function removerow() {
    let data = tabledata;
    let test = data.pop()
    onchangetabledata([...data]);
  }
  return (
    <View>
    <Table tabledata = {tabledata} columns = {columns} datachanged = {datachanged}/>
    <View>
      <Text>Cash : {cashleft}</Text>
    </View>
    <View style = {tablestyles.flexview}>
      <Button title="Addrow" onPress={addrow}/>
      <Button title="Removelastrow" onPress={removerow}/>
    </View>
    </View>
  );
  };

  const tablestyles = StyleSheet.create({
    container : {
      width :800
    },
    flexview : {
      flexDirection : 'row',
      padding:10,
      justifyContent : 'space-between'
    }
  })