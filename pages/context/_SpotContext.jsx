import React, { createContext, useContext, useState, } from 'react';

const SpotContext = createContext();

const SpotProvider = ({ children }) => {
  const [SpotData, setSpotData] = useState([])

  return (
    <SpotContext.Provider value={{ SpotData, setSpotData }}>
      {children}
    </SpotContext.Provider>
  );
};

export default SpotProvider;

export const useFile = () => {
  return useContext(SpotContext);
};
