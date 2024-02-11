/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
'use client'

import { Global } from "../Xcontainer";
import Welcome from "../Welcome";
import AddNew from "./_addNew";

import SpotWidget from "./_SpotWidget"
import JadwalShalat from "./_JadwalShalat";
import Jokes from "./_jokes";


const Box = ({children}) => {
  return (
    <div className="shadowBox shadowWidget">
      <div className="block">
        {children}
      </div>
    </div>
  )
}

export default function Widget () {
  const { userConfig, Login, Mobile, DELETE } = Global()
  const removeBlock = (id) => {
    const copy = userConfig.widget.find(widget => widget.id_widget == id)
    DELETE('widget', id)
    localStorage.setItem(`widget_${copy.type}`, JSON.stringify([]))
  }

  const WidgetList = [
    {
      name: 'List Tugas SPOT',
      type: 'spotTask'
    },
    {
      name: 'Jadwal Shalat',
      type: 'JadwalShalat'
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

  return (!userConfig ? <></> 
  : <>
    <div className="top">
      <div className="shadowBox shadowWelcome">
        <Welcome />
      </div>
      {Mobile ? '' : 
      userConfig.widget.map((item, i) => {
        if (i == 0) {
          const id = item.id_widget,
              type = item.type

          return (
            <Box key={i}>
              {item.type=='spotTask' ? <SpotWidget id={id} fetchWidget={fetchWidget} type={type} remove={removeBlock}/> : ''}
              {item.type=='JadwalShalat' ? <JadwalShalat id={id} remove={removeBlock}/> : ''}
              {item.type=='jokes' ? <Jokes id={id} remove={removeBlock}/> : ''}
            </Box>
          )
        }})}
      {Mobile ? '' : (userConfig.widget.length != 0) ? '' : 
      <AddNew WidgetList={WidgetList} />}
    </div>
    {Mobile ? '' : 
    <div className="bot">
      {userConfig.widget.map((item, i) => {
        if (i > 0) {
          const id = item.id_widget,
              type = item.type

          return (
            <Box key={i}>
              {item.type=='spotTask' ? <SpotWidget id={id} fetchWidget={fetchWidget} type={type} remove={removeBlock}/> : ''}
              {item.type=='JadwalShalat' ? <JadwalShalat id={id} remove={removeBlock}/> : ''}
              {item.type=='jokes' ? <Jokes id={id} remove={removeBlock}/> : ''}
            </Box>
          )
        }})}
      {(userConfig.widget.length > 4 || userConfig.widget.length == 0) ? '' : 
      <AddNew WidgetList={WidgetList} />}
    </div>}
  </>)
}