import React, { useState, useEffect } from "react";
import { StyleSheet,TextInput, Text, Button,View,ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Tablecelloption(props) {
    const data = props.optiondata
    useEffect(()=>{
        onchangecell(props.celldata);
    },[props.celldata])
    let [eachcell, onchangecell] = useState(props.celldata); 
    const [isFocus, setIsFocus] = useState(false);
    function changedata(value) {
        onchangecell(value);
        props.changingtabledata(props.rowindex ,props.eachcol.actualname, value)
    }
    return (
        <>
            <View>
                <Dropdown
                style={[tablestyles.input,{width:props.eachcol.width, height: '50px'}, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={eachcell}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    changedata(item.value);
                    setIsFocus(false);
                }}
                />
            </View>
        </>
    );
}
const tablestyles = StyleSheet.create({
    input: {
      borderWidth: 1,
      alignItems: "center",
      textAlign : "center",
      padding:2
    }
  })
  
  const styles = StyleSheet.create({
  
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      fontSize: 16,
    },
  });