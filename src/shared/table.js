import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ScrollView,
} from "react-native";
import Tablerow from "./tablerow";
export default function Table(props) {
  // let tabledata = props.tabledata;
  let columns = props.columns;
  function changingtabledata(rowindex, columnname, value) {
    props.tabledata[rowindex][columnname] = value;
    props.datachanged(props.tabledata, rowindex, columnname, value);
  }

  return (
    <>
      <ScrollView horizontal={true}>
        <View style={props.tabledata.container}>
          <View style={tablestyles.rows}>
            {columns.map((data, index) => (
              <Text
                style={[tablestyles.input, { width: data.width }]}
                key={"Head" + index}
              >
                {data.displayname}
              </Text>
            ))}
          </View>
          <View>
            {props.tabledata.map((eachdata, rowindex) => (
              <Tablerow
                key={"data" + rowindex}
                rowdata={eachdata}
                rowindex={rowindex}
                columns={columns}
                changingtabledata={changingtabledata}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const tablestyles = StyleSheet.create({
  container: {
    width: 800,
  },
  rows: {
    flexDirection: "row",
    position: "relative",
    top: 0,
    left: 0,
  },
  oddrow: {
    backgroundColor: "#ebebeb",
  },
  evenrow: {
    backgroundColor: "#f7f5f5",
  },
  input: {
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#000000",
    color: "#fff",
  },
});
