import React, { useState } from 'react';

const DaysheetContext = React.createContext([{}, () => {}]);

const DaysheetProvider = (props) => {
  const [oilsales, addoils] = useState({oilsales:0,engineoilsales:0,cash:0});
  return (
    <DaysheetContext.Provider value={[oilsales, addoils]}>
      {props.children}
    </DaysheetContext.Provider>
  );
}

export { DaysheetContext, DaysheetProvider };