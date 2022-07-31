import React, { useState } from 'react';

const SgaredContext = React.createContext([{}, () => {}]);

const SgaredProvider = (props) => {
  const [oilsales, addoils] = useState({savecounter : 0,employee : true});
  return (
    <SgaredContext.Provider value={[oilsales, addoils]}>
      {props.children}
    </SgaredContext.Provider>
  );
}

export { SgaredContext, SgaredProvider };