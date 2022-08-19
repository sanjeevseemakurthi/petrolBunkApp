import React, { useState,useEffect,useContext } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { savereadings, saveperticulars,saveengineoils} from "../../services/sharedservices"
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Confirmsubmission({navigation , route}) {
    const [state, setState] = useContext(DaysheetContext);
    async function submitdata() {
        await saveperticulars(state.perticularsdata).then((res)=>{
          
        }).catch()
        await savereadings(state.oildata).then((res)=>{
         
        }).catch()
        await saveengineoils(state.engineoildata).then((res)=>{
       
        }).catch()
        state.savecounter = state.savecounter + 1;

        route.params.navigating.navigate('Sucesspage');
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