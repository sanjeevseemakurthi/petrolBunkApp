import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function fdate(fromDate) {
  const tesymonth = fromDate.getMonth() + 1;
  const testdate = fromDate.getDate();
  return (
    fromDate.getFullYear() +
    "-" +
    (tesymonth < 10 ? "0" + tesymonth : tesymonth) +
    "-" +
    (testdate < 10 ? "0" + testdate : testdate)
  );
}

const url = "http://3.110.83.150:8080/";
axios.interceptors.request.use((req) => {
  async function addheader() {
    let headre;
    if (!req.url.includes("authenticate") && !req.url.includes("newcompany")) {
      await AsyncStorage.getItem("Token").then((value) => {
        headre = value;
      });
      req.headers.Authorization = "Bearer " + headre;
    }
    return req;
  }
  return addheader();
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      sessionexpiredaleart();
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

function sessionexpiredaleart() {
  Alert.alert("Session Expires", "please click ok to continue", [
    { text: "OK", onPress: () => {} },
  ]);
}

export function ComponentServices() {
  return axios.get(url + "test");
}
export function Authenticateservice(payload) {
  return axios.post(url + "authenticate", payload);
}
export function createnewcompanycall(payload) {
  return axios.post(url + "newcompany", payload);
}
export function sessioncheck() {
  return axios.get(url + "sessioncheck");
}
export function getpumps(date) {
  return axios.post(url + "getpumps", date);
}
export function getengineoils(date) {
  return axios.post(url + "getengineoils", date);
}
export function savereadings(payload) {
  return axios.post(url + "savereadings", payload);
}
export function saveengineoils(payload) {
  return axios.post(url + "saveengineoils", payload);
}
export function getaccounts(date) {
  return axios.post(url + "getaccounts", date);
}
export function saveperticulars(payload) {
  return axios.post(url + "saveperticulars", payload);
}
export function checkreadings() {
  return axios.get(url + "checkreadings");
}

// for home page
export function getcallibrationdetails() {
  return axios.get(url + "getcallibration");
}
export function postcallibrationdetails(payload) {
  return axios.post(url + "postcallibdetails", payload);
}

// for perticulars
export function getonlyaccounts() {
  return axios.get(url + "getaccountsonly");
}
export function getpericulardetails(data) {
  return axios.post(url + "getpericulardetails", data);
}
// export function postpericulardetails(payload) {
//   return axios.post(url + "postcallibdetails", payload);
// }

// for settings
export function geteditdetails(suburl) {
  return axios.get(url + suburl);
}
export function savedetails(suburl, payload) {
  return axios.post(url + suburl, payload);
}
export function deletedetails(suburl, payload) {
  return axios.post(url + suburl, payload);
}
