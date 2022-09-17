import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Switch,
  StyleSheet,
  Dimensions,
} from "react-native";
import DatePickerTest from "./datepickertest";

export default function Eachtext(textprops) {
  const [isEnabled, setIsEnabled] = useState(false);
  let [text, onchangetext] = useState(textprops.eachtext);
  let date = new Date();
  if (textprops.type === "Date" && textprops.eachtext !== "") {
    let j = text.split("-").map((data) => parseFloat(data, 10));
    console.log();
    date = new Date(j[0], j[1] - 1, j[2] + 1);
  }
  if (textprops.type === "Boolean" && textprops.eachtext === true) {
    setIsEnabled(true);
  }
  if (textprops.type === "Date" && textprops.eachtext === "") {
    textprops.textchange(
      textprops.editablecol,
      new Date().toISOString().split("T")[0]
    );
  }
  function changedata(value) {
    onchangetext(value);
    if (textprops.type === "Text") {
      textprops.textchange(textprops.editablecol, value);
    }
    if (textprops.type === "Number") {
      textprops.textchange(textprops.editablecol, parseFloat(value));
    }
  }
  function initaldatechanged(date) {
    textprops.textchange(textprops.editablecol, date.date);
  }
  function toggleSwitch() {
    textprops.textchange(textprops.editablecol, !isEnabled);
    setIsEnabled(!isEnabled);
  }
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width - 150,
        }}
      >
        <Text style={{ width: 100 }}>{textprops.editablecol}</Text>
        <View>
          {textprops.type !== "Date" && textprops.type !== "Boolean" && (
            <TextInput
              value={text}
              onChangeText={changedata}
              style={{
                borderColor: "blue",
                borderWidth: 2,
                margin: 10,
                borderRadius: 2,
                width: 100,
                paddingLeft: 5,
              }}
            ></TextInput>
          )}
          {textprops.type === "Date" && (
            <DatePickerTest
              datechanged={initaldatechanged}
              buttontitle=" "
              initaldate={date}
            ></DatePickerTest>
          )}
          {textprops.type === "Boolean" && (
            <View style={styles.container}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
  },
});
