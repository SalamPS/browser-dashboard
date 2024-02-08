/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Login from "./_Login";
import Short from "./_Short";
import Todo from "./_Todo";
import SpotAuth from "./_SpotAuth";

export default function Popup ({storageKey, Valid, setValid, savedConfig, setSavedConfig, userConfig, setUserConfig, setLogin, TogglePopup, setTogglePopup, fetchValid, setSpotData, POST}) {
  const [content, setContent] = useState(<><h1>a</h1></>)
  
  useEffect(() => {
    switch(TogglePopup) {
      case 'Todo' : setContent(<Todo toggle={setTogglePopup} POST={POST} storageKey={storageKey} config={{...userConfig}} setConfig={setUserConfig}/>)
      break
      case 'Login' : setContent(<Login toggle={setTogglePopup} setLogin={setLogin}/>)
      break
      case 'Short' : setContent(<Short toggle={setTogglePopup} POST={POST} storageKey={storageKey} userConfig={userConfig} setUserConfig={setUserConfig}/>)
      break
      case 'SpotAuth' : setContent(<SpotAuth toggle={setTogglePopup}/>)
      break
    }
  }, [TogglePopup])

  return (<div>
    {content}
  </div>)
}