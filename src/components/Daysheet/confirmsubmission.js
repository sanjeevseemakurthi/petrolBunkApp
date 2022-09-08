import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import {
  savereadings,
  saveperticulars,
  saveengineoils,
} from "../../services/sharedservices";
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Confirmsubmission({ navigation, route }) {
  let date = route.params.dateselected;
  let todaysdate = new Date().toISOString().split("T")[0];
  const [state, setState] = useContext(DaysheetContext);
  async function submitdata() {
    await saveperticulars({ date: date.date, data: state.perticularsdata })
      .then((res) => {})
      .catch();
    if (date.date === todaysdate) {
      await savereadings(state.oildata)
        .then((res) => {})
        .catch();
      await saveengineoils(state.engineoildata)
        .then((res) => {})
        .catch();
    }
    state.savecounter = state.savecounter + 1;
  }
  return (
    <>
      <View
        style={{
          margin: 10,
          width: 200,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onPress={() => submitdata()}
          title="confitm sbmission"
          color="#511be3"
        />
      </View>
    </>
  );
}
