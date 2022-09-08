import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { getonlyaccounts } from "../../services/sharedservices";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Listofaccounts({ navigation, route }) {
  let [tabledata, onchangetabledata] = useState([]);
  let [tableactualdata, onchangeactualdata] = useState([]);
  let [searchtext, onchangetext] = useState([]);
  useEffect(() => {
    populatedata();
  }, []);
  async function populatedata() {
    await getonlyaccounts()
      .then((res) => {
        onchangeactualdata(res.data.data);
        onchangetabledata(res.data.data);
      })
      .catch();
  }
  function changsearch(value) {
    onchangetext(value);
    let filterdata = tableactualdata.filter((res) => {
      if (
        !res.name.toLowerCase().search(value.toLowerCase()) ||
        res.name === ""
      )
        return true;
      else return false;
    });
    onchangetabledata([...filterdata]);
  }
  return (
    <View style={{ margin: 10 }}>
      <TextInput
        style={{
          backgroundColor: "rgb(255,255,255)",
          borderWidth: 1,
          marginBottom: 5,
          padding: 2,
          paddingLeft: 10,
          width: 200,
        }}
        onChangeText={changsearch}
        placeholder="serach"
        value={searchtext}
      />
      <View
        style={[listofaccountstyle.pressablestylest, { borderTopWidth: 1 }]}
      >
        <Text> Name </Text>
        <Text> Balance</Text>
      </View>
      <ScrollView>
        {tabledata.map((data, index) => (
          <Pressable
            style={listofaccountstyle.pressablestylest}
            onPress={() => {
              navigation.push("Detailed", { id: data.id });
            }}
            key={data.id + "detailed"}
          >
            <Text> {data.name} </Text>
            <Text> {data.balance ? data.balance : 0} </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
const listofaccountstyle = StyleSheet.create({
  pressablestylest: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    height: 50,
    justifyContent: "space-evenly",
  },
});
