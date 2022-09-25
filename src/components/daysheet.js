import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Engineoil from "./Daysheet/engineoil";
import Perticulars from "./Daysheet/perticulars";
import Readings from "./Daysheet/readings";
import { DaysheetProvider } from "./Daysheet/Context/DaysheetContext";
import Confirmsubmission from "./Daysheet/confirmsubmission";
import { useState, useEffect, useContext } from "react";
import { checkreadings } from "../services/sharedservices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePickerTest from "../shared/datepickertest";
import Icon from "react-native-vector-icons/AntDesign";
import { DaysheetContext } from "./Daysheet/Context/DaysheetContext";

const Tab = createBottomTabNavigator();

function MyTabs(params) {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Readings"
          component={({ navigation, route }) => {
            return (
              <Readings
                dateselected={params.dateselected}
                parentnavigation={params.navigating}
                navigation={navigation}
              />
            );
          }}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <Icon name="rightcircle" size={20} color="#009" />;
            },
          }}
          initialParams={{ dateselected: params.dateselected }}
        />
        <Tab.Screen
          name="Engine oil"
          component={({ navigation, route }) => {
            return (
              <Engineoil
                dateselected={params.dateselected}
                parentnavigation={params.navigating}
                navigation={navigation}
              />
            );
          }}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <Icon name="barschart" size={20} color="#009" />;
            },
          }}
          initialParams={{ dateselected: params.dateselected }}
        />
        <Tab.Screen
          name="Perticulars"
          component={({ navigation, route }) => {
            return (
              <Perticulars
                dateselected={params.dateselected}
                parentnavigation={params.navigating}
                navigation={navigation}
              />
            );
          }}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <Icon name="calculator" size={20} color="#009" />;
            },
          }}
          initialParams={{ dateselected: params.dateselected }}
        />
        <Tab.Screen
          name="submitdata"
          component={() => {
            return (
              <Confirmsubmission
                dateselected={params.dateselected}
                parentnavigation={params.navigating}
              />
            );
          }}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <Icon name="check" size={20} color="#009" />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
export default function Daysheet({ navigation }) {
  return <Daysheetsub navigation={navigation}></Daysheetsub>;
}

function Daysheetsub(params) {
  navigation = params.navigation;
  const [allowacess, setscessforemployee] = useState(true);
  const [refresh, refreshpage] = useState(true);
  const [role, setrole] = useState("");
  const [state, setState] = useContext(DaysheetContext);
  const date2 = new Date();
  date2.setDate(date2.getDate() - 1);
  let [date, updatedate] = useState({
    date: date2.toISOString().split("T")[0],
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchacess();
    });
    return unsubscribe;
  }, [navigation]);
  async function fetchacess() {
    if (state.savecounter) {
      refreshpage(false);
      setTimeout(() => {
        refreshpage(true);
      }, 100);
    }
  }
  function datechanged(date) {
    refreshpage(false);
    let test = date;
    updatedate(test);
    setTimeout(() => {
      refreshpage(true);
    }, 100);
  }
  return (
    <>
      {(allowacess || role === "admin") && (
        <>
          <View style={{ margin: 10 }}>
            <DatePickerTest
              datechanged={datechanged}
              buttontitle="Click Me : "
              maxdate={true}
              initaldate={date2}
            ></DatePickerTest>
          </View>
          {refresh && (
            <>
              <Navigation navigating={navigation} dateselected={date} />
            </>
          )}
        </>
      )}
      {!(allowacess || role === "admin") && (
        <Text> Data is already inserted</Text>
      )}
    </>
  );
}
function Navigation(params) {
  return (
    <NavigationContainer independent={true}>
      <MyTabs
        navigating={params.navigating}
        dateselected={params.dateselected}
      />
    </NavigationContainer>
  );
}
