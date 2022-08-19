import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Engineoil from './Daysheet/engineoil';
import Perticulars from './Daysheet/perticulars';
import Readings from './Daysheet/readings';
import { DaysheetProvider } from './Daysheet/Context/DaysheetContext';
import Confirmsubmission from './Daysheet/confirmsubmission';
import { useState, useEffect,useContext } from "react";
import {checkreadings } from "../services/sharedservices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Datepicker from '../shared/datepicker'

const Tab = createBottomTabNavigator();

function MyTabs(params) {
  return (  <>
              <Tab.Navigator>
              <Tab.Screen name="Readings" component={Readings} options={{headerShown: false}} initialParams = {{ dateselected : params.dateselected }}/>
              <Tab.Screen name="Engine oil" component={Engineoil} options={{headerShown: false}} initialParams = {{ dateselected : params.dateselected }}/>
              <Tab.Screen name="Perticulars" component={Perticulars} options={{headerShown: false}} initialParams = {{ dateselected : params.dateselected }}/>
              <Tab.Screen name="submitdata" component={Confirmsubmission} options={{headerShown: false}} initialParams = {{ navigating : params.navigating }}/>
            </Tab.Navigator>
            </>
      
  );
}

export default function Daysheet({navigation}) {
    const [allowacess, setscessforemployee] = useState(true);
    const [refresh, refreshpage] = useState(true);
    const [role, setrole] = useState('');
    let [date,updatedate] = useState(new Date());
    let [resetdate,resetdateupdate] = useState(new Date());
    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        fetchacess()
      });
      return unsubscribe;
    },[navigation])
    async function fetchacess() {
      setrole('user');
      await checkreadings().then(res=>{
        setscessforemployee(res.data.Allowemployee);
      })
      .catch(err=>{
      })
      await AsyncStorage.getItem('role').then(value =>{
        setrole(value);
    });
    }
    function datechanged(day,month,year) {
      month = month + 1;
      refreshpage(false);
      let test = new Date(year+'-'+(month)+'-'+(day));
      let currentate = new Date();
      updatedate(test);
      setTimeout(() => {
        refreshpage(true);
      }, 100);
    }
    return(
        <>
           {(allowacess || role === 'admin') &&
            <>
                <Datepicker datechanged = {datechanged} day = {resetdate.getDate()} month ={resetdate.getMonth()}
                year = {resetdate.getFullYear()}
                ></Datepicker>
                {
                   refresh &&
                  <>
                    <DaysheetProvider>
                    <Navigation navigating = {navigation} dateselected = {date} />
                    </DaysheetProvider>
                  </>
                }
            </>    
           }
           {
            !(allowacess || role === 'admin') &&
            <Text> Data is already inserted</Text>
           }
        </>
    )
}
function Navigation(params) {
  return (
    <NavigationContainer independent={true}>
      <MyTabs navigating = {params.navigating} dateselected = {params.dateselected}/>
    </NavigationContainer>
  );
}