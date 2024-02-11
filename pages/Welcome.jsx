/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";
import Shortcut from "./widgets/_shortcut";
import Time from "./Time";
import { Global } from "./Xcontainer";

export default function Welcome () {
  const {storageKey, userConfig, setUserConfig, Login, setLogin, Mobile, TogglePopup, setTogglePopup, DELETE } = Global()

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
            Halo, {Login ? Login.nama : 'Master'}
            {' '}
            <i className="login bi bi-sliders" onClick={() => {setTogglePopup('Login')}}></i>
          </h1>
          {!Mobile ? <Time/> : ''}
        </div>
        {!Mobile ? <Shortcut userConfig={userConfig} setUserConfig={setUserConfig} setTogglePopup={setTogglePopup} DELETE={DELETE}/> : ''}
      </div>
    </div>
  </div>
  </>)
}