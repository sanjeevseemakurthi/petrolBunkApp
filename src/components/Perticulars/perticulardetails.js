import React from "react";
import { StyleSheet, Text, Button, View, ScrollView } from "react-native";
import DatePickerTest from "../../shared/datepickertest";
import { useState, useEffect } from "react";
import { getpericulardetails } from "../../services/sharedservices";

export default function Perticulardetails({ navigation, route }) {
  const [filterdata, filterdatarefresh] = useState([]);
  const [actualdata, actualdatarefresh] = useState([]);
  const [pertucalardetails, pertucalardetailschange] = useState([]);
  const [filtersumjama, changefiltersumjama] = useState(0);
  const [filtersumkarchu, changefiltersumkarchu] = useState(0);

  let date1 = new Date();
  let date2 = new Date();
  date1.setDate(date1.getDate() - 30);
  useEffect(() => {
    populatedata();
  }, []);
  async function populatedata() {
    await getpericulardetails({ id: route.params.id })
      .then((res) => {
        actualdatarefresh(res.data.data);
        pertucalardetailschange(res.data.accinfo);
        filterbydate(res.data.data);
      })
      .catch((err) => {});
  }
  function initaldatechanged(date) {
    date1 = new Date(date.date);
    console.log(date.date);
    filterbydate(actualdata);
  }
  function finaldatechanged(date) {
    date2 = new Date(date.date);
    filterbydate(actualdata);
  }
  function filterbydate(datatofilter) {
    let jama = 0;
    let karchu = 0;
    let data = [];
    datatofilter.forEach((res) => {
      const datetest1 = new Date(res.date);
      console.log(datetest1, date1, date2);
      date1.setHours(23, 59, 59, 0);
      date2.setHours(23, 59, 59, 0);
      if (datetest1 < date2 && datetest1 > date1) {
        jama = jama + res.jama;
        karchu = karchu + res.karchu;
        data.push(res);
      }
    });
    console.log(data);
    filterdatarefresh([...data]);
  }
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-evenly",
        }}
      >
        <Button
          title="Back"
          onPress={() => {
            navigation.push("Accounts");
          }}
        ></Button>
        <DatePickerTest
          datechanged={initaldatechanged}
          buttontitle="satrt Date :"
          initaldate={date1}
        ></DatePickerTest>
        <DatePickerTest
          datechanged={finaldatechanged}
          buttontitle="End Date :"
          initaldate={date2}
        ></DatePickerTest>
      </View>

      <ScrollView>
        {console.log(filterdata)}
        {filterdata.map((data, index) => (
          <View key={"dataofperticular" + index}>
            <Banner discription={data} accouninfo={pertucalardetails} />
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function Banner(test) {
  let params = test.discription;
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
      <Text> {test.accouninfo}</Text>
      <Text> {params.jama}</Text>
      <Text>{params.karchu}</Text>
    </View>
  );
}
