import React, { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import { useState } from "react";
import { fdate } from "../services/sharedservices";
export default function DatePickerTest(props) {
  const [date, setDate] = useState(
    props.initaldate ? props.initaldate : new Date()
  );
  const iswindows = Platform.OS === "web";
  const [show, setShow] = useState(false);
  const [datetext, chnagedatetext] = useState(
    props.initaldate ? fdate(props.initaldate) : fdate(new Date())
  );
  const [maxdate, changemaxdate] = useState(
    props.maxdate ? new Date() : new Date().setDate(new Date().getDate() + 365)
  );

  const onChange = (event, selectedDate) => {
    if (fdate(date) !== fdate(selectedDate)) {
      const currentDate = selectedDate;

      setDate(currentDate);
      let format = fdate(currentDate);
      props.datechanged({ date: format });
    }
    setShow(false);
  };
  function showDatepicker() {
    setShow(true);
  }
  return (
    <View style={datepicker.dateview}>
      {!iswindows && (
        <Button
          onPress={showDatepicker}
          title={(props.buttontitle ? props.buttontitle : "") + fdate(date)}
        />
      )}
      {iswindows && (
        <View>
          <TextInput value={datetext} onChangeText={chnagedatetext}></TextInput>
          <Button
            title="pressme"
            onPress={() => {
              props.datechanged({ date: datetext });
            }}
          ></Button>
        </View>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          maximumDate={maxdate}
        />
      )}
    </View>
  );
}
const datepicker = StyleSheet.create({
  dateview: {
    flexDirection: "row",
  },
  textstyle: {
    borderColor: "rgb(0, 0, 255)",
    borderWidth: 1,
    padding: 10,
  },
});
