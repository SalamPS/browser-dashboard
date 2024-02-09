import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Global } from "../Xcontainer"

export default function Login () {
  const { Login, setLogin, setTogglePopup } = Global()
  const [LoginData, setLoginData] = useState({
    uname: '',
    token: '',
  })
  const [Show, setShow] = useState('OAuth')

  useEffect(() => {
    if (Login) setShow('Settings')
  }, [])

  // Client Login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      fetch(`/api/default?dest=user&id=${LoginData.uname}&token=${LoginData.token}`)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log(data)
            if (data == [] || data.guest) {setLogin('guest'); return false}
            else {
              setLogin({nama: data[0].nama})
              Cookies.set('id_user', data[0].id_user);
              localStorage.setItem('userAuth', JSON.stringify({nama: data[0].nama}));
              return true;
            }
          })
        }
        else {console.error(`Failed to fetch login data`); return false}
      }).then(auth =>{
        if (auth) location.reload()
      })
    } catch (err) {}
    setTogglePopup(false)
  }
  const handleInput = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveSettings = (e) => {
    e.preventDefault()
    setTogglePopup(false)
  }

  return (<>
    <h3>
      <span className="title">LamP Portal | {Show}</span>
      <span className="nav">
        <i className={`bi bi-${Show == 'OAuth' ? 'gear' : 'door-open'}`}></i>{' '}
        {Show == 'OAuth' ? 'Settings' : 'OAuth'}
      </span>
    </h3>
    {Show == 'OAuth' ? 
    <form>
      <label>
        <span className='span'>Username</span>
        <input
          className="input"
          type="text"
          name="uname"
          value={LoginData.uname}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </label>
      <label>
        <span className='span'>Password</span>
        <input
          className="input"
          type="text"
          name="token"
          value={LoginData.token}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </label>
      <div className="button">
        <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); setTogglePopup(false)}}>Cancel</button>
        <button id="submit" type="submit" title="Login" onClick={(e) => {handleLogin(e)}}>Submit</button>
      </div>
    </form> : ''}

    {Show == 'Settings' ? 
    <form>
      <div className="button">
        <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); setTogglePopup(false)}}>Exit</button>
        <button id="submit" type="submit" title="Login" onClick={(e) => {saveSettings(e)}}>Save</button>
      </div>
    </form> : ''}
  </>)
}