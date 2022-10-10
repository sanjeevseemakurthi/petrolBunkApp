import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { postcallibrationdetails, fdate } from "../services/sharedservices";
import { useState, useEffect } from "react";
import Table from "../shared/table";
import DatePickerTest from "../shared/datepickertest";

export default function Homepage({ navigation }) {
  const [filterdata, filterdatarefresh] = useState([]);
  const [actualdata, actualdatarefresh] = useState([]);
  let date1 = new Date();
  let date2 = new Date();
  date2.setDate(date2.getDate() + 40);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      populatedata({
        initialdate: fdate(date1),
        finaldate: fdate(date2),
      });
    });
    return unsubscribe;
  }, [navigation]);
  async function populatedata(payload) {
    await postcallibrationdetails(payload)
      .then((res) => {
        actualdatarefresh(res.data.data);
      })
      .catch((err) => {});
  }
  function initaldatechanged(date) {
    date1 = new Date(date.date);
    populatedata({
      initialdate: date.date,
      finaldate: fdate(date2),
    });
  }
  function finaldatechanged(date) {
    date2 = new Date(date.date);
    populatedata({
      initialdate: fdate(date1),
      finaldate: date.date,
    });
  }
  return (
    <ImageBackground
      source={require("../../assets/loginbg1.jpg")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
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
      <ScrollView>
        {actualdata.map((data, index) => (
          <View key={"data" + index}>
            <Banner discription={data.discription} nextdate={data.nextdate} />
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
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
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
      }}
    >
      <Text> {params.discription}</Text>
      <Text> {params.nextdate}</Text>
      <Text>{leftdays}</Text>
    </View>
  );
}
