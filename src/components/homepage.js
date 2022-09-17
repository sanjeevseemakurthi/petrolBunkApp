import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ScrollView,
} from "react-native";
import { getcallibrationdetails } from "../services/sharedservices";
import { useState, useEffect } from "react";
import Table from "../shared/table";
import DatePickerTest from "../shared/datepickertest";

export default function Homepage() {
  const [filterdata, filterdatarefresh] = useState([]);
  const [actualdata, actualdatarefresh] = useState([]);
  const date1 = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() + 40);
  useEffect(() => {
    populatedata();
  }, []);
  async function populatedata() {
    await getcallibrationdetails()
      .then((res) => {
        actualdatarefresh(res.data.data);
      })
      .catch((err) => {});
  }
  function initaldatechanged(date) {}
  function finaldatechanged(date) {}
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-evenly",
        }}
      >
        <DatePickerTest
          datechanged={initaldatechanged}
          buttontitle="satrt Date : "
          initaldate={date1}
        ></DatePickerTest>
        <DatePickerTest
          datechanged={finaldatechanged}
          buttontitle="End Date : "
          initaldate={date2}
        ></DatePickerTest>
      </View>
      {actualdata.map((data, index) => (
        <View key={"data" + index}>
          <Banner discription={data.discription} nextdate={data.nextdate} />
        </View>
      ))}
    </>
  );
}

function Banner(params) {
  let date2 = new Date();
  let date = params.nextdate;
  let leftdays = 0;
  Math.round((date - date2) / (1000 * 60 * 60 * 24));
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderWidth: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Text> {params.discription}</Text>
      <Text> {params.nextdate}</Text>
      <Text>{leftdays}</Text>
    </View>
  );
}
