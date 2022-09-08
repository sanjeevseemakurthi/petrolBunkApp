import React, { useEffect, useState } from "react";
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
import DatePickerTest from "../../shared/datepickertest";
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
  let adjustwidth = Math.floor(Dimensions.get("window").width / 6);
  useEffect(() => {
    populatedata();
  }, []);
  async function populatedata() {
    await geteditdetails(route.params.suburl)
      .then((res) => {
        changecolumn([...res.data.columNames]);
        changetabledata([...res.data.data]);
        columnchangeeditable([...res.data.editable]);
        adjustwidth = Math.floor(
          Dimensions.get("window").width / res.data.columNames.length
        );
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
    await savedetails(route.params.submiturl, datatosave)
      .then((res) => {
        populatedata();
      })
      .catch();
  }
  async function deletedata(datatodelete) {
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
    <>
      <Button
        title="Add New Row"
        onPress={() => {
          setModalVisible(true);
        }}
      ></Button>
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
                  style={[tablestyles.input, { width: 150 }]}
                >
                  {eachcol}
                </Text>
              ))}
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
                      style={[tablestyles.input, { width: 150 }]}
                    >
                      {eachrow[eachcol]}
                    </Text>
                  ))}
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
                      ? selectedrow[eacheditable.name]
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
    </>
  );
}
function Eachtext(textprops) {
  let [text, onchangetext] = useState(textprops.eachtext);
  let date = new Date();
  if (textprops.type === "Date" && textprops.eachtext !== "") {
    let j = text.split("-").map((data) => parseInt(data, 10));
    console.log();
    date = new Date(j[0], j[1] - 1, j[2] + 1);
  }
  function changedata(value) {
    onchangetext(value);
    if (textprops.type === "Text") {
      textprops.textchange(textprops.editablecol, value);
    }
    if (textprops.type === "Number") {
      textprops.textchange(textprops.editablecol, parseInt(value));
    }
  }
  function initaldatechanged(date) {
    textprops.textchange(textprops.editablecol, date.date);
  }
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ margin: 10 }}>{textprops.editablecol}</Text>
        {textprops.type !== "Date" && (
          <TextInput
            value={text}
            onChangeText={changedata}
            style={{
              borderColor: "blue",
              borderWidth: 2,
              margin: 10,
              borderRadius: 2,
            }}
          ></TextInput>
        )}
        {textprops.type === "Date" && (
          <DatePickerTest
            datechanged={initaldatechanged}
            buttontitle="satrt Date"
            initaldate={date}
          ></DatePickerTest>
        )}
      </View>
    </>
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
