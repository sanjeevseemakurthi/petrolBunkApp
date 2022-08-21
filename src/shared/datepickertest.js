import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, View, Button } from 'react-native';
import { useState } from 'react';
 
export default function DatePickerTest(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (date.toISOString().split('T')[0] !== selectedDate.toISOString().split('T')[0]) {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    let format = currentDate.toISOString().split('T')[0];
    props.datechanged({date: format});
    }
  };
  function showDatepicker()  {
    setShow(true);
  };
  return (
    <View>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Text>selected: {date.toISOString().split('T')[0]}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};