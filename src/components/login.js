import React, { Component } from "react";
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
import { Authenticateservice } from "../services/sharedservices";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login(props) {
  let [loginclicked, onloginclicked] = useState(false);
  let [createaccountclicked, oncreateclicked] = useState(false);
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
            <Text style={styles.textheader}>Welcome to Bunk desk</Text>
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
                <Button
                  onPress={() => submitted()}
                  title="Submit"
                  color="#511be3"
                  accessibilityLabel="Learn more about this purple button"
                />
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
                <View style={styles.buttonstyle}>
                  <Button
                    title="Login"
                    onPress={() => {
                      onloginclicked(true);
                      oncreateclicked(false);
                    }}
                  ></Button>
                </View>
                <View style={styles.buttonstyle}>
                  <Button
                    title="Create new user"
                    onPress={() => {
                      onloginclicked(false);
                      oncreateclicked(true);
                    }}
                  ></Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
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
    margin: 5,
    justifyContent: "center",
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
    fontSize: 25,
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
