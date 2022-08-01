import React from "react";
import { StyleSheet, Text, Button } from 'react-native';

export default function Sucesspage() {
 
    return (
        <>
          <Text> Scucessfully inserted</Text>
        </>
    );
    function clearstorage() {
        AsyncStorage.clear();   
    }
}