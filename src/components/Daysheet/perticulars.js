import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Button,
  ScrollView,
} from "react-native";
import Table from "../../shared/table";
import { getaccounts, saveperticulars } from "../../services/sharedservices";
import { DaysheetContext } from "./Context/DaysheetContext";
export default function Perticulars(params) {
  const [state, setState] = useContext(DaysheetContext);
  let [tabledata, onchangetabledata] = useState([]);
  let [columns, onchangecolumns] = useState([]);
  let [cashleft, cashchange] = useState([]);
  let [options, newoptions] = useState([]);
  let holddata = [];
  let date = params.dateselected;
  let selecteddate = new Date(date.date);
  selecteddate.setDate(selecteddate.getDate() + 1);
  useEffect(() => {
    populatedata();
  }, []);
  useEffect(() => {
    if (tabledata !== []) {
      let chanedata = tabledata;
      options.forEach((element) => {
        if (element.label === "oilsales") {
          let index = chanedata.findIndex((ele) => {
            if (ele.accountid === element.value) {
              return true;
            } else {
              return false;
            }
          });
          chanedata[index].jama = state.oilsales;
        }
        if (element.label === "engineoilsales") {
          let index = chanedata.findIndex((ele) => {
            if (ele.accountid === element.value) {
              return true;
            } else {
              return false;
            }
          });
          chanedata[index].jama = state.engineoilsales;
        }
      });
      onchangetabledata([...chanedata]);
      datachanged(tabledata, 0, 0, 0);
    }
  }, [state.oilsales, state.engineoilsales]);
  useEffect(() => {
    const unsubscribe = params.navigation.addListener("focus", () => {
      refresh();
    });
    return unsubscribe;
  }, [params.navigation]);
  useEffect(() => {
    const unsubscribe = params.parentnavigation.addListener("focus", () => {
      refresh();
    });
    return unsubscribe;
  }, [params.parentnavigation]);
  async function refresh() {
    let index = state.needrefresh.indexOf("getaccountsforedit");
    if (index !== -1) {
      state.needrefresh.splice(index, 1);
      setState(state);
      populatedata();
    }
  }
  let cashindex = -1;
  let oilindex = -1;
  let engineoilindex = -1;
  async function populatedata() {
    await getaccounts(date)
      .then((res) => {
        holddata = [];
        let holdtabledata = [];
        res.data.data.forEach((element) => {
          let row = {
            label: element.name,
            value: element.id,
          };
          holddata.push(row);
          if (element.name === "cash") {
            cashindex = element.id;
            let newrow = {
              accountid: element.id,
              discription: "",
              jama: res.data.cash,
              karchu: 0,
              date: selecteddate,
              roweditable: false,
            };
            holdtabledata.push(newrow);
          }
          if (element.name === "oilsales") {
            oilindex = element.id;
            let newrow = {
              accountid: element.id,
              discription: "",
              jama: state.oilsales,
              karchu: 0,
              date: selecteddate,
              roweditable: false,
            };
            holdtabledata.push(newrow);
          }
          if (element.name === "engineoilsales") {
            engineoilindex = element.id;
            let newrow = {
              accountid: element.id,
              discription: "",
              jama: state.engineoilsales,
              karchu: 0,
              date: selecteddate,
              roweditable: false,
            };
            holdtabledata.push(newrow);
          }
        });
        if (res.data.perticulars.length !== 0) {
          holdtabledata = res.data.perticulars;
          let newrow = {
            accountid: cashindex,
            discription: "",
            jama: res.data.cash,
            karchu: 0,
            date: selecteddate,
            roweditable: false,
          };
          let toilindex = holdtabledata.findIndex((ele) => {
            if (ele.accountid === oilindex) return true;
            else false;
          });
          holdtabledata[toilindex].roweditable = false;
          let tengineoilindex = holdtabledata.findIndex((ele) => {
            if (ele.accountid === engineoilindex) return true;
            else false;
          });
          holdtabledata[tengineoilindex].roweditable = false;
          holdtabledata.push(newrow);
        }
        newoptions(holddata);
        onchangetabledata(holdtabledata);
        datachanged(holdtabledata, 0, 0, 0);
        let cashremaining = 0;
        holdtabledata.forEach((element) => {
          cashremaining =
            cashremaining +
            parseFloat(element.jama) -
            parseFloat(element.karchu);
        });
        cashchange(cashremaining);
        let columndata = [
          {
            displayname: "Name",
            actualname: "accountid",
            type: "numeric",
            width: 300,
            editable: false,
            showselection: true,
            optiondata: holddata,
          },
          {
            displayname: "Discription",
            actualname: "discription",
            type: "word",
            width: 100,
            editable: true,
          },
          {
            displayname: "Jama",
            actualname: "jama",
            type: "numeric",
            width: 100,
            editable: true,
          },
          {
            displayname: "Karchu",
            actualname: "karchu",
            type: "numeric",
            width: 100,
            editable: true,
          },
        ];
        onchangecolumns(columndata);
      })
      .catch((err) => {});
  }

  function datachanged(data, rowindex, columnname, value) {
    let test = state;

    setState(test);
    let cashremaining = 0;
    data.forEach((element) => {
      cashremaining =
        cashremaining + parseFloat(element.jama) - parseFloat(element.karchu);
    });
    test.cash = cashremaining;
    test.perticularsdata = data;
    cashchange(cashremaining);
    onchangetabledata([...data]);
  }
  function addrow() {
    let newrow = {
      accountid: -1,
      discription: "",
      jama: 0,
      karchu: 0,
      date: selecteddate,
      roweditable: true,
    };
    onchangetabledata([...tabledata, newrow]);
  }
  function removerow() {
    if (tabledata.length <= 3) {
      return;
    }
    let data = tabledata;
    let test = data.pop();
    onchangetabledata([...data]);
    datachanged(data, 0, 0, 0);
  }
  return (
    <ImageBackground
      source={require("../../../assets/loginbg1.jpg")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView style={{ margin: 10 }}>
        <Table
          tabledata={tabledata}
          columns={columns}
          datachanged={datachanged}
        />
        <View>
          <Text>Cash : {cashleft}</Text>
        </View>
        <View style={tablestyles.flexview}>
          <Button title="Addrow" onPress={addrow} />
          <Button title="Removelastrow" onPress={removerow} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const tablestyles = StyleSheet.create({
  container: {
    width: 800,
  },
  flexview: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
});
