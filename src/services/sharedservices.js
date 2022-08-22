import axios from 'axios';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://192.168.31.104:8080/';
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
        }}
      ]
    );
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
export function getpumps(date) {
    return axios.post(url + 'getpumps',date)
}
export function getengineoils(date) {
    return axios.post(url + 'getengineoils',date)
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
export function checkreadings() {
    return axios.get(url + 'checkreadings')
}