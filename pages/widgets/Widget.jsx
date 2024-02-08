/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
'use client'

import { useEffect, useState } from "react";
import Welcome from "../Welcome";
import SpotWidget from "./_SpotWidget"
import AddNew from "./_addNew";
import Quotes from "./_quote";
import Jokes from "./_jokes";

const Box = ({fetchWidget,type,remove,id,setTogglePopup}) => {
  const [content, setContent] = useState(<></>)

  useEffect(() => {
    switch(type) {
      case 'spotTask' : setContent(<SpotWidget id={id} fetchWidget={fetchWidget} type={type} remove={remove} setTogglePopup={setTogglePopup}/>)
      break
      case 'quote' : setContent(<Quotes id={id} remove={remove}/>)
      break
      case 'jokes' : setContent(<Jokes id={id} remove={remove}/>)
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

export default function Widget ({storageKey, setValid, savedConfig, userConfig, setUserConfig, Login, setLogin, Mobile, TogglePopup, setTogglePopup, POST, DELETE}) {
  const removeBlock = (id) => {
    const copy = userConfig.widget.find(widget => widget.id_widget == id)
    localStorage.setItem(`widget_${copy.type}`, JSON.stringify([]))
    DELETE('widget', id)
  }

  const WidgetList = [
    {
      name: 'List Tugas SPOT',
      type: 'spotTask'
    },
    {
      name: 'Daily Quote',
      type: 'quote'
    },
    {
      name: 'Dad Jokes',
      type: 'jokes'
    }
  ]
  const fetchWidget = async (dest,setData) => {
    if (Login != false && Login != "guest") {
      try {
        // Fetch Data and Save it to Temp
        const response = await fetch(`api/default?dest=${dest}`)
        if (response.ok) {
          const data = await response.json();
          if (!data.guest) {
            localStorage.setItem(dest, JSON.stringify(data))
            setData(data)
          }
        }
        else {console.error(`Failed to fetch ${dest}`)}
      } catch (error) {console.error(`Error fetching ${dest}:`, error)}
    }
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

          DELETE={DELETE}
        />
      </div>
      {Mobile ? '' : userConfig.widget.map((content, i) => {
        if (i == 0) return (<Box key={i} 
        setTogglePopup={setTogglePopup}
        fetchWidget={fetchWidget}
        remove={removeBlock}
        type={content.type}
        id={content.id_widget}
      />)})}
      {Mobile ? '' : (userConfig.widget.length != 0) ? '' : 
      <AddNew userConfig={userConfig} WidgetList={WidgetList} setUserConfig={setUserConfig} POST={POST}/>}
    </div>
    {Mobile ? '' : 
    <div className="bot">
      {userConfig.widget.map((content, i) => {
        if (i > 0) return (<Box key={i}
        setTogglePopup={setTogglePopup}
        fetchWidget={fetchWidget}
        remove={removeBlock}
        type={content.type} 
        id={content.id_widget}
      />)})}
      {(userConfig.widget.length > 4 || userConfig.widget.length == 0) ? '' : 
      <AddNew userConfig={userConfig} WidgetList={WidgetList} setUserConfig={setUserConfig} POST={POST}/>}
    </div>}
  </>)
}