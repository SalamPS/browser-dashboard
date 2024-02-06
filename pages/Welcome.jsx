/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";
import Shortcut from "./widgets/_shortcut";
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
          {!Mobile ? <Time/> : ''}
        </div>
        {!Mobile ? <Shortcut userConfig={userConfig} setUserConfig={setUserConfig} setTogglePopup={setTogglePopup}/> : ''}
      </div>
    </div>
  </div>
  </>)
}