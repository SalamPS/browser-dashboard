/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from "react";
import Time from "./Time";
import Cookies from 'js-cookie';

export default function Welcome ({storageKey, userConfig, setUserConfig, Login, setLogin, Mobile }) {
  const [ToggleShortcut, setToggleShortcut] = useState(false)
  const [shortFormData, setshortFormData] = useState({
    id_short: 0,
    name: '',
    url: '',
  })
  
  const [ToggleLogin, setToggleLogin] = useState(false)
  const [LoginData, setLoginData] = useState({
    uname: '',
    token: '',
  })
  
  // Setup Data for Shortcut
  // 
  // Check if available in clearbit
  // 
  const saveShort = async (e) => {
    e.preventDefault()
    const pushShort = async (isValid) => {
      const validated = {...shortFormData}
      validated.favicon = isValid;
      const response = await fetch('/api/default?dest=short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validated),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const temp = {...userConfig}
      temp.short.push(validated)
      setUserConfig(temp)
      localStorage.setItem(storageKey, JSON.stringify(temp))
    }
    try {
      (async () => {
        await fetch(`https://logo.clearbit.com/${shortFormData.url.replace(/^(https?:|)\/\//, '')}`)
        .then(() => pushShort(1))
        .catch(() => pushShort(0))
      })();
    } 
    catch (error) {
      console.error('Error during POST request:', error);
    }
    setToggleShortcut(false)
  }
  const handleChange = (name, value) => {
    setshortFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Client Login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/default?dest=user&id=${LoginData.uname}&token=${LoginData.token}`);
      if (response.ok) {
        response.json().then(data => {
          if (data == []) setLogin('guest')
          else {
            setLogin({nama: data[0].nama})
            Cookies.set('token', data[0].token);
            Cookies.set('id_user', data[0].id_user);
            localStorage.setItem('userAuth', JSON.stringify({nama: data[0].nama}))
          }
        })
      }
      else {console.error(`Failed to fetch ${dest} data`)}
    } catch (err) {}
    setToggleLogin(false)
  }
  const handleInput = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  useEffect(() => {
    const auth = localStorage.getItem('userAuth')
    auth ? setLogin(JSON.parse(auth)) : ''
  }, [])

  return (!userConfig ? '' : <>
  <div className="welcome">
    <div className="addShort" style={ToggleShortcut ? {zIndex: 2, opacity: 1} : {zIndex: -1, opacity: 0}}>
      <div className="input">
        <form>
          <h3>New Shortcut</h3>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={shortFormData.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </label>
          <label>
            <span>Link</span>
            <input
              type="text"
              name="url"
              value={shortFormData.url}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </label>
          <div className="button">
            <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); setToggleShortcut(false)}}>Cancel</button>
            <button id="submit" type="submit" title="Save new List" onClick={(e) => {saveShort(e)}}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div className="addShort" style={ToggleLogin ? {zIndex: 2, opacity: 1} : {zIndex: -1, opacity: 0}}>
      <div className="input">
        <form>
          <h3>LamP OAuth | Portal</h3>
          <label>
            <span>Username</span>
            <input
              type="text"
              name="uname"
              value={LoginData.uname}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </label>
          <label>
            <span>Token</span>
            <input
              type="text"
              name="token"
              value={LoginData.token}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </label>
          <div className="button">
            <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); setToggleLogin(false)}}>Cancel</button>
            <button id="submit" type="submit" title="Save new List" onClick={(e) => {handleLogin(e)}}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div className="inner">
      <div className="pad">
        <div className="head">
          <h1>
            Welcome, {Login ? Login.nama : 'Master'}
            {' '}
            <i className="login bi bi-person-circle" onClick={() => {setToggleLogin(true)}}></i>
          </h1>
          {Mobile ? '' : <Time/>}
        </div>
        <div className="shortcut">
          {!userConfig ? <></> :
          userConfig.short.map((item) => {
            return (
              <div className="short cut" key={item.id_short}>
                <div className="delete">
                  <div className="x" onClick={() => {console.log('delete')}}>x</div>
                </div>
                <a target="_blank" href={item.url.startsWith('http') ? item.url : `http://${item.url}`}>
                  {!item.favicon ? <div className="alternate">{item.name[0]}</div> 
                  : <img src={`https://logo.clearbit.com/${item.url.replace(/^(https?:|)\/\//, '')}`} alt={item.name} />}
                  <br />
                </a>
                <div className="text">
                  <span>{item.name}</span>
                </div>
              </div>
            )
          })}
          {userConfig.short.length > 4 ? '' : 
          <div className="short add">
            <button onClick={() => {
              handleChange('id_short', Math.floor(new Date().getTime() / 1000))
              setToggleShortcut(true)
            }}>+</button>
          </div>}
        </div>
      </div>
    </div>
  </div>
  </>)
}