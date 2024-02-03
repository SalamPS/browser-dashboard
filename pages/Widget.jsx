'use client'

/* eslint-disable react/prop-types */
import SpotTask from "./widgets/_spotTask"

const Box = ({type, userConfig, setUserConfig, setValid}) => {
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
    <div className="block">
      <div className="widget feat">
        <div className="body">
          {widgets[type]}
        </div>
      </div>
    </div>
  )
}

export default function Widget ({savedConfig, setSavedConfig, storageKey, userConfig, setUserConfig, Valid, setValid }) {
  const newBlock = () => {
  }
  const removeBlock = () => {
  }

  return (!userConfig ? '' 
  : <>
    {userConfig.widget.map((content, i) => (<Box key={i} type={content.type}
      userConfig={userConfig}
      setUserConfig={setUserConfig}
      setValid={setValid}
    />))}
    {userConfig.widget.length > 4 ? '' : 
    <div className="block empty" onClick={() => {console.log(savedConfig)}}>
      <div className="widget insert">
        <span>+</span>
      </div>
    </div>}
  </>)
}