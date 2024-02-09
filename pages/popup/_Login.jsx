/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Global } from "../Xcontainer"
import Settings from './_Settings';
import LogIn from './_Log';

export default function Login () {
  const { Login } = Global()
  const [Show, setShow] = useState('OAuth')

  useEffect(() => {
    if (Login) setShow('Settings')
  }, [])

  return (<>
    <h3>
      <span className="title">
        LamP Portal | {Show}
      </span>
      <span className="nav" style={{cursor: 'pointer'}} 
        onClick={() => {
          setShow(Show == 'OAuth' ? 'Settings' : 'OAuth')
        }}>
        <i className={`bi bi-${Show == 'OAuth' ? 'gear' : 'door-open'}`}></i>{' '}
        {Show == 'OAuth' ? 'Settings' : 'OAuth'}
      </span>
    </h3>
    {Show == 'OAuth' ? <LogIn/> : <Settings/>}
  </>)
}