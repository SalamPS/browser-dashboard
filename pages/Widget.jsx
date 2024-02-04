'use client'

import Welcome from "./Welcome";
/* eslint-disable react/prop-types */
import SpotTask from "./widgets/_spotTask"

const Box = ({type, userConfig, setUserConfig}) => {
  const fetchWidget = async (dest) => {
    try {
      // Fetch Data and Save it to Temp
      const response = await fetch(`api/default?dest=${dest}`)
      if (response.ok) {
        const data = await response.json();
        setUserConfig((prevData) => ({
          ...prevData,
          ['widgets']: data
        }))
        return data
      } 
      else {console.error(`Failed to fetch ${dest} data`)}
    } catch (error) {
      console.error(`Error fetching ${dest}:`, error)
    }
  };

  const widgets = {
    spotTask: <SpotTask fetchWidget={fetchWidget} data={userConfig.widgets.filter(item => item.id_widget_spotTask)}/>
  }

  return (
    <div className="shadowBox shadowWidget">
      <div className="block">
        {widgets[type]}
      </div>
    </div>
  )
}

export default function Widget ({storageKey, setValid, savedConfig, userConfig, setUserConfig, Login, setLogin, Mobile, TogglePopup, setTogglePopup}) {
  const newBlock = () => {
  }
  const removeBlock = () => {
  }

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
        if (i == 0) return (<Box key={i} type={content.type}
        userConfig={userConfig}
        setUserConfig={setUserConfig}
        setValid={setValid}
      />)})}
      {Mobile ? '' : (userConfig.widget.length != 0) ? '' : 
      <div className="block empty" onClick={() => {console.log(savedConfig)}}>
        <span>+</span>
      </div>}
    </div>
    {Mobile ? '' : 
    <div className="bot">
      {userConfig.widget.map((content, i) => {
        if (i > 0) return (<Box key={i} type={content.type}
        userConfig={userConfig}
        setUserConfig={setUserConfig}
        setValid={setValid}
      />)})}
      {(userConfig.widget.length > 4 || userConfig.widget.length == 0) ? '' : 
      <div className="block empty" onClick={() => {console.log(savedConfig)}}>
        <span>+</span>
      </div>}
    </div>}
  </>)
}