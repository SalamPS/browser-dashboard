import Button from "./_Button"
import { Global } from "../Xcontainer";
import { useState } from "react";

const CheckLabel = ({children, name, action}) => {
  return (
    <label for={name}>
      <span className="title">{children}</span>
      <input 
        id={name}
        name={name}
        type="checkbox" 
        style={{display: 'none'}}
        onChange={(e) => {action(e.target.name,e.target.checked)}}
      />
      <span className="checkmark">
        <div className="slide"></div>
      </span>
    </label>
  )
}

export default function Settings () {
  const {setTogglePopup, setSettingData} = Global()
  const handleInput = (input,data) => {
    setSettingData(prev => ({
      ...prev,
      [input]: data
    }))
  }
  const saveSettings = () => {
    setTogglePopup(false)
  }

  return (
  <form>
    <div className="setting">
      <CheckLabel name={'minimalist'} action={handleInput}>
        Minimalist
      </CheckLabel>
      <CheckLabel name={'automerge'} action={handleInput}>
        Auto Merge
      </CheckLabel>
    </div>
    <Button action={[
      {text: 'Save', action: saveSettings}
    ]}/>
  </form>)
}