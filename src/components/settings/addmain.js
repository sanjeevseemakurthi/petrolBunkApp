import React from "react";
import { StyleSheet, Text, Button } from "react-native";
import { View } from "react-native";
import { sub } from "react-native-reanimated";

export default function Addmain({ navigation, route }) {
  return (
    <>
      <View style={[{ flexDirection: "row" }]}>
        <Button
          onPress={() =>
            Changeroute(
              "getcallibdetails",
              "calibratioeditandsave",
              "deletecalibration"
            )
          }
          title="Calibration"
          color="#511be3"
        />
        <Button
          onPress={() =>
            Changeroute(
              "getaccountsforedit",
              "accountseditandsave",
              "deleteaccount"
            )
          }
          title="Accounts"
          color="#511be3"
        />
        <Button
          onPress={() =>
            Changeroute(
              "getenginoilforedit",
              "engineoileditandsave",
              "deleteengineoilstock"
            )
          }
          title="Engineoils"
          color="#511be3"
        />
        <Button
          onPress={() =>
            Changeroute("getpumpsforedit", "pumpeditandsave", "deletepump")
          }
          title="Pumps"
          color="#511be3"
        />
      </View>
    </>
  );
  function Changeroute(suburl, submiturl, deleteurl) {
    navigation.push("Detailed", {
      suburl: suburl,
      submiturl: submiturl,
      deleteurl: deleteurl,
    });
  }
}
