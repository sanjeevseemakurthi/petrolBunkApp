import React, { useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { savereadings, saveperticulars,saveengineoils} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Confirmsubmission({navigation , route}) {
    let date = route.params.dateselected;
    let todaysdate = new Date().toISOString().split('T')[0]
    console.log(date);
    const [state, setState] = useContext(DaysheetContext);
    async function submitdata() {
        console.log(date.date === todaysdate)
        await saveperticulars({date:date.date,data:state.perticularsdata}).then((res)=>{
          
        }).catch()
        console.log(state.oildata,state.engineoildata);
        if (date.date === todaysdate) {
            await savereadings(state.oildata).then((res)=>{
            }).catch()
            await saveengineoils(state.engineoildata).then((res)=>{
            }).catch()
        }
        state.savecounter = state.savecounter + 1;
      }
    return (
        <>
            <Button
                onPress={() => submitdata()}
                title="confitm sbmission"
                color="#511be3"
                 />
        </>
    );
}