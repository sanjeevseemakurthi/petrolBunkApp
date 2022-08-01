import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Engineoil from './Daysheet/engineoil';
import Perticulars from './Daysheet/perticulars';
import Readings from './Daysheet/readings';
import { DaysheetProvider } from './Daysheet/Context/DaysheetContext';
import Confirmsubmission from './Daysheet/confirmsubmission';
import { useState, useEffect,useContext } from "react";
import {checkreadings } from "../services/sharedservices";
import { DaysheetContext } from "../components/Daysheet/Context/DaysheetContext";

const Tab = createBottomTabNavigator();

function MyTabs(params) {
  return (  
      <Tab.Navigator>
        <Tab.Screen name="Readings" component={Readings} options={{headerShown: false}} />
        <Tab.Screen name="Engine oil" component={Engineoil} options={{headerShown: false}} />
        <Tab.Screen name="Perticulars" component={Perticulars} options={{headerShown: false}} />
        <Tab.Screen name="submitdata" component={Confirmsubmission} options={{headerShown: false}} initialParams = {{ navigating : params.navigating }}/>
      </Tab.Navigator>
  );
}

export default function Daysheet({navigation}) {
    const [allowacess, setscessforemployee] = useState(true);
    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        console.log("hi");
        fetchacess()
      });
      return unsubscribe;
    },[navigation])
    async function fetchacess() {
      await checkreadings().then(res=>{
        setscessforemployee(res.data.Allowemployee);
      })
      .catch(err=>{
        console.log(err);
      })
    }
    return(
      <>
        { allowacess &&
          <DaysheetProvider>
            <Navigation navigating = {navigation}/>
          </DaysheetProvider>
        }
        {
          !allowacess &&
          <Text> Data is already inserted</Text>
        }
      </>
      
    )
}
function Navigation(params) {
  return (
    <NavigationContainer independent={true}>
      <MyTabs navigating = {params.navigating} />
    </NavigationContainer>
  );
}