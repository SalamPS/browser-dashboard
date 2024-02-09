/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Global } from "../Xcontainer"

import Login from "./_Login";
import Short from "./_Short";
import TodoNew from "./_TodoNew";
import TodoEdit from "./_TodoEdit";
import SpotAuth from "./_SpotAuth";

export default function Popup ({info}) {
  const {TogglePopup } = Global()
  const [content, setContent] = useState(<><h1>a</h1></>)
  
  useEffect(() => {
    switch(TogglePopup) {
      case 'TodoNew' : setContent(<TodoNew/>)
      break
      case 'TodoEdit' : setContent(<TodoEdit id={info}/>)
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