import Button from "./_Button"
import { Global } from "../Xcontainer";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LogIn () {
  const {setUserConfig, Login, setLogin, setTogglePopup} = Global()
  const [LoginData, setLoginData] = useState({
    uname: '',
    token: '',
  })
  // Client Login
  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!Login) {
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
      }).catch(err => console.error('Error:', err))
      setTogglePopup(false)
    }
    else {
      (async () => {
        await setUserConfig({
          todo:[], 
          widget:[],
          short: [],
        })
        await setLogin(false)
        localStorage.clear();
        setTogglePopup(false)
      })()
    }
  }

  const handleInput = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <form>
      <div className="userInput">
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
      </div>
      <Button action={[
        {text: Login ? 'Logout' : 'Login', action: handleLogin}
      ]}/>
    </form>
  )
}