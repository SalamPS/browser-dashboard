/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Time from "./Time";
import Cookies from 'js-cookie';

export default function Welcome ({savedConfig, setSavedConfig, storageKey, userConfig, setUserConfig, Valid, setValid }) {
  Cookies.set('token', 'eyJuYW1lIjoic2FsYW1wYXJhcnRhIiwiaG9zdCI6InNhbGFtcGFyYXJ0YSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.62St0g6EesPAu0JuqZyKGFEzZEJmp_C8PWlwD5U-d7Y', { expires: 7 });
  const [ToggleShortcut, setToggleShortcut] = useState(false)
  const [formData, setFormData] = useState({
    id_short: 0,
    name: '',
    url: ''
  })
  
  // Setup Data for Shortcut
  // 
  const saveShort = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/default?dest=short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
    setToggleShortcut(false)

    const temp = {...userConfig}
    temp.short.push(formData)
    setUserConfig(temp)
    localStorage.setItem(storageKey, JSON.stringify(temp))
  }

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (<>
    <div className="welcome">
      <div className="addShort" style={ToggleShortcut ? {zIndex: 2, opacity: 1} : {zIndex: -1, opacity: 0}}>
        <div className="input">
          <form onSubmit={(e) => {saveShort(e)}}>
            <h3>New Shortcut</h3>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </label>
            <label>
              <span>Link</span>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </label>
            <div className="button">
              <button id="cancel" title="Cancel" onClick={() => {setToggleShortcut(false)}}>Cancel</button>
              <button id="submit" type="submit" title="Save new List">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="inner">
        <div className="pad">
          <div className="head">
            <span>Welcome, Salam </span>
            <Time/>
          </div>
          <div className="shortcut">
            {!userConfig ? <></> :
            userConfig.short.map((item) => (
              <a href={item.url} className="short cut" key={item.id_short} target="_blank">
                <img src={`https://logo.clearbit.com/${item.url.replace(/^(https?:|)\/\//, '')}`} alt={item.name} /> <br />
                <span>{item.name}</span>
              </a>
            ))}
            {userConfig.short.length > 6 ? '' : 
            <div className="short">
              <button onClick={() => {
                handleChange('id_short', new Date().getTime() / 1000)
                setToggleShortcut(true)
              }}>+</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </>)
}