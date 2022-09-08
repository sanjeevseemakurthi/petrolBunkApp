import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Routing from "./src/routing/routing";
import Login from "./src/components/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sessioncheck } from "./src/services/sharedservices";
export default function App() {
  let [Authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    AsyncStorage.clear();
  }, []);
  return (
    <>
      {Authenticated && (
        <NavigationContainer>
          <Routing />
        </NavigationContainer>
      )}
      {!Authenticated && <Login changestate={changestate} />}
    </>
  );
  function changestate(state) {
    setAuthenticated(state);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
