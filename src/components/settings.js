import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Addsub from "./settings/addsub";
import Addmain from "./settings/addmain";

const Stack = createStackNavigator();

export default function Balance() {
  return <Navigation />;
}
function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Settings_all">
      <Stack.Screen
        name="Settings_all"
        component={Addmain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailed"
        component={Addsub}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
