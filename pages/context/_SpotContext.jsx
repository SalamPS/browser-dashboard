import React, { createContext, useContext, useEffect, useState, } from 'react';

const SpotContext = createContext({});

const SpotProvider = ({ children }) => {
  const [SpotData, setSpotData] = useState([])

  useEffect(() => {
    console.log('SpotContext: ',SpotData)
  }, [SpotData])

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
