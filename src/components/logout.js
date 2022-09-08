import React from "react";
import { StyleSheet, Text, Button, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  return (
    <>
      <Button onPress={() => clearstorage()} title="Logout" color="#511be3" />
    </>
  );
  function clearstorage() {
    AsyncStorage.clear();
  }
}
