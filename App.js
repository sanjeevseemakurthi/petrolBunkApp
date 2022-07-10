import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import Routing from './src/routing/routing';
import Login from './src/components/login';
import { sessioncheck } from './src/services/sharedservices';
export default function App() {
  let [Authenticated, setAuthenticated] = useState(true);
  useEffect(()=>{sessionchecking()},[]);
  return (
    <>
    {/* {Authenticated && */}
    {
     <NavigationContainer >
          <Routing/>
      </NavigationContainer >
    }
    {/* {!Authenticated && <Login changestate = {changestate}/>} */}
    </>
  );
  async function sessionchecking()  {
    await sessioncheck().then((res)=>{
      console.log(res.data);
      setAuthenticated(true);
    }).catch(er=>{
      setAuthenticated(false);
    });
  }
  function changestate(state) {
    setAuthenticated(state)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
