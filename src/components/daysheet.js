import * as React from "react";
import { Text, View, Button, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Engineoil from "./Daysheet/engineoil";
import Perticulars from "./Daysheet/perticulars";
import Readings from "./Daysheet/readings";
import Confirmsubmission from "./Daysheet/confirmsubmission";
import { useState, useEffect, useContext } from "react";
import DatePickerTest from "../shared/datepickertest";
import Icon from "react-native-vector-icons/AntDesign";
import { DaysheetContext } from "./Daysheet/Context/DaysheetContext";
import { fdate } from "../services/sharedservices";

const Tab = createBottomTabNavigator();

function MyTabs(params) {
  const [state, setState] = useContext(DaysheetContext);
  state.parentnavigation = params.navigating;
  setState(state);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Readings"
          component={Readings}
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
          component={Engineoil}
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
          component={Perticulars}
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
          component={Confirmsubmission}
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return <Icon name="check" size={20} color="#009" />;
            },
          }}
          initialParams={{ dateselected: params.dateselected }}
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
    date: fdate(date2),
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
    <View style={{ backgroundColor: "#000005", height: "100%" }}>
      <ImageBackground
        source={require("../../assets/bglogs1.jpg")}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
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
      </ImageBackground>
    </View>
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
