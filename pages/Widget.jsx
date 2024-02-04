/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
'use client'

import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import SpotTask from "./widgets/_spotTask"

const Box = ({fetchWidget,type}) => {
  const [content, setContent] = useState(<></>)

  useEffect(() => {
    switch(type) {
      case 'spotTask' : setContent(<SpotTask fetchWidget={fetchWidget} type={type}/>)
      break
    }
  }, [])

  return (
    <div className="shadowBox shadowWidget">
      <div className="block">
        {content}
      </div>
    </div>
  )
}

export default function Widget ({storageKey, setValid, savedConfig, userConfig, setUserConfig, Login, setLogin, Mobile, TogglePopup, setTogglePopup}) {
  const newBlock = () => {
  }
  const removeBlock = () => {
  }
  const fetchWidget = async (dest,setData) => {
    try {
      // Fetch Data and Save it to Temp
      const response = await fetch(`api/default?dest=${dest}`)
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(dest, JSON.stringify(data))
        setData(data)
      }
      else {console.error(`Failed to fetch ${dest}`)}
    } catch (error) {console.error(`Error fetching ${dest}:`, error)}
  };

  return (!userConfig ? '' 
  : <>
    <div className="top">
      <div className="shadowBox shadowWelcome">
        <Welcome
          storageKey={storageKey}
          userConfig={userConfig} 
          setUserConfig={setUserConfig}
          TogglePopup={TogglePopup}
          setTogglePopup={setTogglePopup}
          Login={Login}
          setLogin={setLogin}
          Mobile={Mobile}
        />
      </div>
      {Mobile ? '' : userConfig.widget.map((content, i) => {
        if (i == 0) return (<Box key={i} 
        fetchWidget={fetchWidget}
        type={content.type}
      />)})}
      {Mobile ? '' : (userConfig.widget.length != 0) ? '' : 
      <div className="block empty" onClick={() => {console.log(savedConfig)}}>
        <span>+</span>
      </div>}
    </div>
    {Mobile ? '' : 
    <div className="bot">
      {userConfig.widget.map((content, i) => {
        if (i > 0) return (<Box key={i}
        fetchWidget={fetchWidget}
        type={content.type} 
      />)})}
      {(userConfig.widget.length > 4 || userConfig.widget.length == 0) ? '' : 
      <div className="block empty" onClick={() => {console.log(savedConfig)}}>
        <span>+</span>
      </div>}
    </div>}
  </>)
}