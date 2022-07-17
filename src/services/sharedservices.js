import axios from 'axios';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://localhost:8080/';
axios.interceptors.request.use(
    req=>{
            async function addheader() {
                let headre;
                if(!req.url.includes('authenticate')) {
                    await AsyncStorage.getItem('Token').then(value =>{
                            headre = value
                        });
                        req.headers.Authorization = 'Bearer '+ headre;
                }
                return req;
            }
            return addheader();
        })
        axios.interceptors.response.use(function (response) {
            return response;
          }, function (error) {
              if(error.response.status === 403) {
                console.log("403 error")
                sessionexpiredaleart();
                return Promise.reject(error);
              } else {
                return Promise.reject(error);
              }
           
          });


function sessionexpiredaleart() { 
    Alert.alert(
      "Session Expires",
      "please click ok to continue",
      [
        { text: "OK", onPress: ()=>{
            console.log("hi");
        }}
      ]
    );
    console.log("after")
}

export  function ComponentServices() {
    return  axios.get(url + 'test')
}
export function Authenticateservice(payload) {
    return axios.post(url + 'authenticate',payload)
}
export function sessioncheck() {
    return axios.get(url + 'sessioncheck')
}
export function getpumps() {
    return axios.get(url + 'getpumps')
}
export function getengineoils() {
    return axios.get(url + 'getengineoils')
}
export function savereadings(payload) {
    return axios.post(url + 'savereadings',payload)
}
export function saveengineoils(payload) {
    return axios.post(url+ 'saveengineoils',payload)
}
export function getaccounts() {
    return axios.get(url + 'getaccounts')
}
export function saveperticulars(payload) {
    return axios.post(url + 'saveperticulars',payload)
}