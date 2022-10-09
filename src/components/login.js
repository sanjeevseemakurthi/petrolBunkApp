import React, { Component } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import {
  Authenticateservice,
  createnewcompanycall,
} from "../services/sharedservices";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login(props) {
  let [loginclicked, onloginclicked] = useState(false);
  let [createaccountclicked, oncreateclicked] = useState(false);
  let [companyname, onchangecompany] = useState("");
  let [username, onchangeusername] = useState("");
  let [password, onChangepassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/loginbg1.jpg")}
        style={styles.image}
      >
        <View style={styles.parentview}>
          <View style={styles.childviewone}>
            <Text style={styles.apptitle}>Welcome to Bunk desk</Text>
          </View>
          <View style={styles.childviewtwo}>
            {loginclicked && (
              <View style={styles.userdetails}>
                <TextInput
                  variant="standard"
                  label="username"
                  style={styles.textform}
                  onChangeText={onchangeusername}
                  value={username}
                  placeholder="username"
                />
                <TextInput
                  variant="standard"
                  label="Password"
                  secureTextEntry={true}
                  style={styles.textform}
                  onChangeText={onChangepassword}
                  value={password}
                  placeholder="password"
                />
                <Pressable
                  onPress={() => submitted()}
                  style={[styles.buttonstyle, { justifyContent: "center" }]}
                >
                  <Text style={styles.textheader}> Submit</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    onloginclicked(false);
                    oncreateclicked(false);
                  }}
                >
                  <Text style={styles.textStylepresable}> Go Back</Text>
                </Pressable>
              </View>
            )}
            {!createaccountclicked && !loginclicked && (
              <View style={styles.userdetails}>
                <Pressable
                  style={styles.buttonstyle}
                  onPress={() => {
                    onloginclicked(true);
                    oncreateclicked(false);
                  }}
                >
                  <Text style={styles.textheader}>Login</Text>
                  <Icon name="login" size={20} color="#fafafa" />
                </Pressable>
                <Pressable
                  style={styles.buttonstyle}
                  onPress={() => {
                    onloginclicked(false);
                    oncreateclicked(true);
                  }}
                >
                  <Text style={styles.textheader}>Create new User</Text>
                  <Icon name="adduser" size={20} color="#fafafa" />
                </Pressable>
              </View>
            )}
            {createaccountclicked && (
              <View style={styles.userdetails}>
                <TextInput
                  variant="standard"
                  label="Comapny name"
                  style={styles.textform}
                  onChangeText={onchangecompany}
                  value={companyname}
                  placeholder="Comapny name"
                />
                <TextInput
                  variant="standard"
                  label="username"
                  style={styles.textform}
                  onChangeText={onchangeusername}
                  value={username}
                  placeholder="username"
                />
                <TextInput
                  variant="standard"
                  label="Password"
                  secureTextEntry={true}
                  style={styles.textform}
                  onChangeText={onChangepassword}
                  value={password}
                  placeholder="password"
                />
                <Pressable
                  onPress={() => createnewcompany()}
                  style={[styles.buttonstyle, { justifyContent: "center" }]}
                >
                  <Text style={styles.textheader}> Creat company </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    onloginclicked(false);
                    oncreateclicked(false);
                  }}
                >
                  <Text style={styles.textStylepresable}> Go Back</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

  async function createnewcompany() {
    let payload = {
      name: companyname,
      location: "test",
      username: username,
      password: password,
    };
    const data = await createnewcompanycall(payload)
      .then((res) => {
        submitted();
      })
      .catch((err) => {});
  }

  async function submitted() {
    let payload = {
      username: username,
      password: password,
    };
    const data = await Authenticateservice(payload)
      .then((res) => {
        AsyncStorage.setItem("Token", res.data.jwtToken);
        AsyncStorage.setItem("role", res.data.role);
        props.changestate(true);
      })
      .catch((err) => {});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  buttonstyle: {
    width: "50%",
    padding: 10,
    margin: 7,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e3deb",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textStylepresable: {
    textDecorationLine: "underline",
    marginTop: 20,
  },
  userdetails: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  parentview: {
    flex: 1,
    // color: "rgb(255, 0, 255)",
    // backgroundColor: "#511be3",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  childviewone: {
    flex: 1,
    // color: "rgb(0, 0, 0)",
    // backgroundColor: "#511be3",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  childviewtwo: {
    flex: 1,
    color: "rgb(0, 0, 0)",
    backgroundColor: "#ffffff",
    alignContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    width: "100%",
  },
  textheader: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },
  apptitle: {
    fontSize: 40,
    fontWeight: "500",
    color: "#ffffff",
  },
  textform: {
    width: "70%",
    backgroundColor: "rgb(250, 250, 250)",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});
