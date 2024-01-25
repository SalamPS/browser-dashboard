'use client'

import { Exo_2 } from 'next/font/google'
const font = Exo_2({ subsets: ['latin'] })

import Merge from "./Merge";
import Welcome from "./Welcome";
import Widget from "./Widget";
import Todo from "./Todo";
import { useState } from "react";

export default function Xcontainer () {
  const [Valid, setValid] = useState({todo:true, widget:true})
  const storageKey = 'userConfig';
  const [userConfig, setUserConfig] = useState({todo:[], widget:[]})
  const [savedConfig, setSavedConfig] = useState({todo:[], widget:[]})
  
  return (<>
    {(!Valid.todo || !Valid.widget) ? <Merge 
      storageKey={storageKey}
      Valid={Valid} 
      setValid={setValid}
      savedConfig={savedConfig} 
      setSavedConfig={setSavedConfig} 
      userConfig={userConfig} 
      setUserConfig={setUserConfig}  
    /> : ''}
    <main className={font.className}>
      <div className="container">
        <Todo 
          storageKey={storageKey}
          Valid={Valid} 
          setValid={setValid}
          savedConfig={savedConfig} 
          setSavedConfig={setSavedConfig} 
          userConfig={userConfig} 
          setUserConfig={setUserConfig}
        />
        <div className="blocks">
          <div className="box">
            <Welcome/>
            <Widget/>
          </div>
          <div className="watermark">
            <span>By LamP</span>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </main>
  </>)
}