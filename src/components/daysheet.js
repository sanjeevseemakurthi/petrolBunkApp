import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Engineoil from './Daysheet/engineoil';
import Perticulars from './Daysheet/perticulars';
import Readings from './Daysheet/readings';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Readings" component={Readings} options={{headerShown: false}} />
      <Tab.Screen name="Engine oil" component={Engineoil} options={{headerShown: false}} />
      <Tab.Screen name="Perticulars" component={Perticulars} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}

export default function Daysheet() {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}
