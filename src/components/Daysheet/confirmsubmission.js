import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ImageBackground, Text, Button, View } from "react-native";
import {
  savereadings,
  saveperticulars,
  saveengineoils,
  fdate,
} from "../../services/sharedservices";
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Confirmsubmission(params) {
  let date = params.dateselected;
  let todaysdate = new Date();
  todaysdate.setDate(todaysdate.getDate() - 1);
  const [state, setState] = useContext(DaysheetContext);
  async function submitdata() {
    await saveperticulars({ date: date.date, data: state.perticularsdata })
      .then((res) => {})
      .catch();
    if (date.date === fdate(todaysdate)) {
      await savereadings(state.oildata)
        .then((res) => {})
        .catch();
      await saveengineoils(state.engineoildata)
        .then((res) => {})
        .catch();
    }
    state.savecounter = true;
    params.parentnavigation.navigate("Home");
  }
  return (
    <ImageBackground
      source={require("../../../assets/bglogs1.jpg")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
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
    </ImageBackground>
  );
}
