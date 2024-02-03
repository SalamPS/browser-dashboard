/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Exo_2 } from 'next/font/google'
const font = Exo_2({ subsets: ['latin'] })

import Merge from "./Merge";
import Welcome from "./Welcome";
import Widget from "./Widget";
import Todo from "./Todo";
import { useState, useEffect } from "react";

export default function Xcontainer () {
  const base = {
    todo:[], 
    widget:[],
    widgets:[],
    short: [],
  }
  const storageKey = 'userConfig';
  const [Init, setInit] = useState(false)
  const [Login, setLogin] = useState(false)
  const [Valid, setValid] = useState({todo:true, widget:true, short: true})
  const [userConfig, setUserConfig] = useState({...base})
  const [savedConfig, setSavedConfig] = useState({...base})

  useEffect(() => {
    if (Init) localStorage.setItem(storageKey, JSON.stringify(userConfig))
  }, [userConfig]);

  ///////////////////
  // Storage Setup
  // 
  //
  // Set Client Configuration in Cache for offline usage and API Controls
  //
  // GET TodoList and Validate if the Online and Offline data are synced
  // Get recent cache from Client Local Storage and Fetch from Database
  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem(storageKey))
    if (oldData) setUserConfig(oldData)

    const logged = JSON.parse(localStorage.getItem('userAuth'))
    if (logged) setLogin(logged)
  }, []);
  // 
  // 
  // 
  // If user Logged in, fetch data from online database
  // 
  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem(storageKey))
    const fetchValid = async (dest) => {
      try {
        // Fetch Data and Save it to Temp
        const response = await fetch(`api/default?dest=${dest}`)
        if (response.ok) {
          setInit(true)
          const data = await response.json();
          if (data.guest) return data

          setSavedConfig((prevData) => ({
            ...prevData,
            [dest]: data,
          }))
          if (oldData) {
            if ((JSON.stringify(data) !== JSON.stringify(oldData[dest])))
              setValid((Valid) => ({...Valid,[dest]: false}))
          }
          else if (JSON.stringify(data) !== JSON.stringify(userConfig[dest])) 
          {
            setValid((Valid) => ({...Valid,[dest]: false}))
          }
          return data
        } 
        else {console.error(`Failed to fetch ${dest} data`)}
      } catch (error) {
        console.error(`Error fetching ${dest}:`, error)
      }
    };
    if (Login != false && Login != "guest") {
      (async () => {
        fetchValid('todo').then(
          fetchValid('short')
        ).then(
          fetchValid('widget')
        ).then(
          setInit(true)
        )
      })();
    }
  }, [Login])
  // 
  //
  // Storage Setup End
  /////////////////// 
  
  
  return (<>
    {(!Valid.todo || !Valid.widget || !Valid.short) ? <Merge 
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
        <div className="shadowBox shadowTodo">
          <Todo 
            storageKey={storageKey}
            userConfig={userConfig} 
            setUserConfig={setUserConfig}
          />
        </div>
        <div className="blocks">
          <div className="box">
            <Widget
              storageKey={storageKey}
              setValid={setValid}
              setSavedConfig={setSavedConfig} 
              userConfig={userConfig} 
              setUserConfig={setUserConfig}
              Login={Login}
              setLogin={setLogin}
            />
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