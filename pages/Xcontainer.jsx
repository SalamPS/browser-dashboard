/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Exo_2 } from 'next/font/google'
const font = Exo_2({ subsets: ['latin'] })

import Popup from './popup/Popup';
import Merge from "./Merge";
import Widget from "./widgets/Widget";
import Todo from "./Todo";
import { useState, useEffect } from "react";

export default function Xcontainer () {
  ///////////////////
  // Popup Toggle
  // 
  // 
  // This Popup served for the User's form input
  // Popup variable will be set as the PopUp Name
  // EG: "short", "login"
  const [TogglePopup, setTogglePopup] = useState(false)
  // 
  // 
  // Popup Toggle End
  ///////////////////

  ///////////////////
  // Storage Setup
  // 
  //
  const base = {
    todo:[], 
    widget:[],
    short: [],
  }
  const storageKey = 'userConfig';
  const [Init, setInit] = useState(false)
  const [Login, setLogin] = useState(false)
  const [Mobile, setMobile] = useState(false)
  const [Valid, setValid] = useState({todo:true, widget:true, short: true})
  const [userConfig, setUserConfig] = useState({...base})
  const [savedConfig, setSavedConfig] = useState({...base})
  //
  useEffect(() => {
    if (Init) localStorage.setItem(storageKey, JSON.stringify(userConfig))
  }, [userConfig]);
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
    else localStorage.setItem(storageKey, JSON.stringify(userConfig))
  
    setInit(true)
  }, []);
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

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) setMobile(true)
  }, []);
  
  return (<>
    {(!Valid.todo || !Valid.widget || !Valid.short) ? <Merge 
      storageKey={storageKey}

      Login={Login} 
      Valid={Valid} 
      userConfig={userConfig} 
      savedConfig={savedConfig} 
      TogglePopup={TogglePopup}

      setLogin={setLogin}
      setValid={setValid}
      setUserConfig={setUserConfig}
      setSavedConfig={setSavedConfig} 
      setTogglePopup={setTogglePopup}
    /> : ''}
    <div id="popup" style={{
      zIndex: TogglePopup ? 3 : -1,
      opacity: TogglePopup ? 1 : -1
    }} className={font.className}>
      <div className="holder" id={`${TogglePopup}`}
        style={{
          transition: TogglePopup ? '.1s' : '0s',
          opacity: TogglePopup ? '1' : '0'
        }}>
        <Popup
          storageKey={storageKey}

          Login={Login} 
          Valid={Valid} 
          userConfig={userConfig} 
          savedConfig={savedConfig} 
          TogglePopup={TogglePopup}

          setLogin={setLogin}
          setValid={setValid}
          setUserConfig={setUserConfig}
          setSavedConfig={setSavedConfig} 
          setTogglePopup={setTogglePopup}
        />
      </div>
    </div>
    <main className={font.className}>
      <div className="container">
        <div className="shadowBox shadowTodo">
          <Todo 
            storageKey={storageKey}

            Login={Login} 
            Valid={Valid} 
            userConfig={userConfig} 
            savedConfig={savedConfig} 
            TogglePopup={TogglePopup}

            setLogin={setLogin}
            setValid={setValid}
            setUserConfig={setUserConfig}
            setSavedConfig={setSavedConfig} 
            setTogglePopup={setTogglePopup}
          />
        </div>
        <div className="blocks">
          <div className="box">
            <Widget
              storageKey={storageKey}

              Login={Login} 
              Valid={Valid} 
              userConfig={userConfig} 
              savedConfig={savedConfig} 
              TogglePopup={TogglePopup}

              setLogin={setLogin}
              setValid={setValid}
              setUserConfig={setUserConfig}
              setSavedConfig={setSavedConfig} 
              setTogglePopup={setTogglePopup}
              Mobile={Mobile}
            />
          </div>
          {Mobile ? '' : 
          <div className="watermark">
            <span>By LamP</span>
            <div className="line"></div>
          </div>}
        </div>
        {!Mobile ? '' : 
        <div className="watermark">
          <span>By LamP</span>
          <div className="line"></div>
        </div>}
      </div>
    </main>
  </>)
}