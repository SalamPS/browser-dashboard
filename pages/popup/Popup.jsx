/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Global } from "../Xcontainer"

import Login from "./_Login";
import Short from "./_Short";
import Todo from "./_Todo";
import SpotAuth from "./_SpotAuth";

export default function Popup () {
  const {TogglePopup } = Global()
  const [content, setContent] = useState(<><h1>a</h1></>)
  
  useEffect(() => {
    switch(TogglePopup) {
      case 'Todo' : setContent(<Todo/>)
      break
      case 'Login' : setContent(<Login/>)
      break
      case 'Short' : setContent(<Short/>)
      break
      case 'SpotAuth' : setContent(<SpotAuth/>)
      break
    }
  }, [TogglePopup])

  return (<>
    {content}
  </>)
}