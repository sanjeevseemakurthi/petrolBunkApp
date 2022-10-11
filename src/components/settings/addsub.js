import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  View,
  Modal,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { DaysheetContext } from "../Daysheet/Context/DaysheetContext";
import Eachtext from "../../shared/eachTextedit";
import {
  geteditdetails,
  savedetails,
  deletedetails,
} from "../../services/sharedservices";

export default function Addsub({ navigation, route }) {
  let [column, changecolumn] = useState([]);
  let [columneditable, columnchangeeditable] = useState([]);
  let [tabledata, changetabledata] = useState([]);
  let [refresh, changerefresh] = useState(false);
  let [selectedrow, changeselectedrow] = useState({});
  let [modalVisible, setModalVisible] = useState(false);
  let [adjustwidth, onchangewidth] = useState(30);
  const [state, setState] = useContext(DaysheetContext);
  let holdstate = state;

  function populatechange() {
    if (!holdstate.needrefresh.includes(route.params.suburl)) {
      holdstate.needrefresh.push(route.params.suburl);
      setState(holdstate);
    }
  }
  useEffect(() => {
    populatedata();
  }, []);
  async function populatedata() {
    await geteditdetails(route.params.suburl)
      .then((res) => {
        changecolumn([...res.data.columNames]);
        changetabledata([...res.data.data]);
        columnchangeeditable([...res.data.editable]);
        let testwidth = Math.floor(
          (Dimensions.get("window").width - 10) /
            (res.data.columNames.length + 1)
        );
        onchangewidth(parseInt(testwidth));
        console.log(adjustwidth);
        changerefresh(true);
      })
      .catch();
  }
  function editval(col, value) {
    let row = selectedrow;
    row[col] = value;
    console.log(row);
    changeselectedrow(row);
  }
  function editrow(row) {
    changeselectedrow(row);
    setModalVisible(true);
  }
  function submitfun() {
    setModalVisible(!modalVisible);
    savedata(selectedrow);
    changeselectedrow({});
  }
  async function savedata(datatosave) {
    populatechange();
    await savedetails(route.params.submiturl, datatosave)
      .then((res) => {
        populatedata();
      })
      .catch();
  }
  async function deletedata(datatodelete) {
    populatechange();
    await deletedetails(route.params.deleteurl, datatodelete)
      .then((res) => {
        if (res.data.Status === "Failed") {
          Alert.alert("Error", "test", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
        }
        populatedata();
      })
      .catch();
  }
  return (
    <View style={{ margin: 5 }}>
      <View
        style={{
          padding: 10,
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 200,
            padding: 10,
            justifyContent: "space-around",
          }}
        >
          <Button
            title="Go Back"
            onPress={() => {
              navigation.goBack();
            }}
          ></Button>
        </View>
        <View
          style={{ width: 200, padding: 10, justifyContent: "space-around" }}
        >
          <Button
            title="Add New Row"
            onPress={() => {
              setModalVisible(true);
            }}
          ></Button>
        </View>
      </View>
      {refresh && (
        <ScrollView horizontal={true}>
          <ScrollView>
            <View
              style={[
                {
                  flexDirection: "row",
                  borderWidth: 1,
                },
              ]}
            >
              {column.map((eachcol, colindex) => (
                <Text
                  key={colindex}
                  style={[tablestyles.input, { width: adjustwidth }]}
                >
                  {eachcol}
                </Text>
              ))}
              <Text style={[tablestyles.input, { width: adjustwidth }]}>
                Action
              </Text>
            </View>
            {tabledata.map((eachrow, rowindex) => (
              <View key={rowindex}>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      borderWidth: 1,
                    },
                  ]}
                >
                  {column.map((eachcol, colindex) => (
                    <Text
                      key={colindex}
                      style={[tablestyles.input, { width: adjustwidth }]}
                    >
                      {eachrow[eachcol]}
                    </Text>
                  ))}
                  <View style={{ width: adjustwidth, flexDirection: "row" }}>
                    <Button
                      title="edit"
                      onPress={() => editrow(eachrow)}
                    ></Button>
                    <Button
                      title="delete"
                      onPress={() => deletedata(eachrow)}
                    ></Button>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      )}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            {columneditable.map((eacheditable, editindex) => (
              <View key={editindex}>
                <Eachtext
                  eachtext={
                    selectedrow[eacheditable.name]
                      ? selectedrow[eacheditable.name].toString()
                      : ""
                  }
                  type={eacheditable.type}
                  editablecol={eacheditable.name}
                  textchange={editval}
                ></Eachtext>
              </View>
            ))}
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
              ></Button>
              <Button title="Submit" onPress={() => submitfun()}></Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const tablestyles = StyleSheet.create({
  input: {
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    justifyContent: "space-evenly",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
