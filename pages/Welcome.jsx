/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from "react";
import Time from "./Time";

export default function Welcome ({storageKey, userConfig, setUserConfig, Login, setLogin, Mobile, TogglePopup, setTogglePopup }) {
  useEffect(() => {
    const auth = localStorage.getItem('userAuth')
    auth ? setLogin(JSON.parse(auth)) : ''
  }, [])

  return (!userConfig ? '' : <>
  <div className="welcome">
    <div className="inner">
      <div className="pad">
        <div className="head">
          <h1>
            Welcome, {Login ? Login.nama : 'Master'}
            {' '}
            <i className="login bi bi-person-circle" onClick={() => {setTogglePopup('Login')}}></i>
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
              setTogglePopup('Short')
            }}>+</button>
          </div>}
        </div>
      </div>
    </div>
  </div>
  </>)
}