import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Listofaccounts from "./Perticulars/listofaccounts";
import Perticulardetails from "./Perticulars/perticulardetails";

const Stack = createStackNavigator();

export default function Balance() {
  return (
    <Navigation/>
  );
}
function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Accounts">
      <Stack.Screen name="Accounts" component={Listofaccounts}  options={{ headerShown: false }}/>
      <Stack.Screen name="Detailed" component={Perticulardetails}  options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}