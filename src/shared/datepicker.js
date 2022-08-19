import React, { useState, useEffect } from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Datepicker(props) {
  let days = []
    let [dateselected, changedatestate] = useState(new Date().getDate());
    let [monthselected, changemonthstate] = useState(new Date().getMonth()+1);
    let [yearselected, changeyearsstate] = useState(new Date().getFullYear());
    const [isFocusdays, setIsFocusdays] = useState(false);
    const [isFocusmonths, setIsFocusmonths] = useState(false);
    const [isFocusyears, setIsFocusyears] = useState(false);
    let testmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let months = [];
    testmonths.forEach((element,index) => {
      let row = {
        label: element,
        value:(index)
      }
        months.push(row);
    });
    let years = [];
    for(let i = parseInt(new Date().getFullYear()) - 3 ;i < parseInt(new Date().getFullYear()) + 3; i++) {
      let row = {
        label: i,
        value: i
      }
        years.push(row);
    }
    let templastdate = daysInMonth(new Date().getFullYear(),new Date().getMonth())
    for (let i = 1 ;i <= templastdate;i++) {
      let row = {
        label: i,
        value: i
      }
      days.push(row);
    }
    function daysInMonth (year, month) {
        return new Date(year, month, 0).getDate();
    }
    useEffect(()=>{
      props.datechanged(dateselected,monthselected,yearselected);
    },[dateselected,monthselected,yearselected]);
    useEffect(()=>{
      if (props.date) {
        changedatestate(props.date);
      }
    },[props.date]);
    useEffect(()=>{
      if(props.month) {
        changemonthstate(props.month);
      }
    },[props.month]);
    useEffect(()=>{
      if(props.year) {
        changeyearsstate(props.year);
      }
    },[props.year]);
    return (
        <>
        <View style = {styles.mainpannel}>
          <Text>Date :    </Text>
          <Dropdown
          style={[isFocusdays && { borderColor: 'blue' },{width: 40}]}
          data={days}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          value={dateselected}
          onFocus={() => setIsFocusdays(true)}
          maxHeight={300}
          labelField="label"
                valueField="value"
          onBlur={() => setIsFocusdays(false)}
          placeholder={!isFocusdays ? 'dd' : '...'}
          onChange={item => {
            changedatestate(item.value);
            setIsFocusdays(false);
            
            }}
          />
          <Text>/ </Text>
          <Dropdown
          style={ [isFocusdays && { borderColor: 'blue' },{width: 50}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={months}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusmonths ? 'mm' : '...'}
          value={monthselected}
          onFocus={() => setIsFocusmonths(true)}
          onBlur={() => setIsFocusmonths(false)}
          onChange={item => {
            changemonthstate(item.value);
            setIsFocusmonths(false);
            
            }}
          />
          <Text>/ </Text>
          <Dropdown
          style={[isFocusyears && { borderColor: 'blue' },{width: 56}]}
          data={years}
          value={yearselected}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}         
          onFocus={() => setIsFocusyears(true)}
          maxHeight={300}
          labelField="label"
                valueField="value"
          placeholder={!isFocusyears ? 'yyyy' : '...'}
          onBlur={() => setIsFocusyears(false)}
          onChange={item => {
            changeyearsstate(item.value);
            setIsFocusyears(false);
            
            }}
          />
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    mainpannel : {
      display: "flex",
      flexDirection: 'row',
      alignContent: 'center', 
      alignItems:"center",
      borderColor:'smoke',
      borderWidth:1, 
      alignSelf: 'flex-start',
      backgroundColor: 'white',
      borderRadius:10,
      margin:2,
      padding:2,
      paddingLeft: 5
    }
  })