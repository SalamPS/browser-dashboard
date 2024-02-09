import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Global } from "../Xcontainer"

export default function Login () {
  const { setLogin, setTogglePopup } = Global()
  const [LoginData, setLoginData] = useState({
    uname: '',
    token: '',
  })
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

  return (<>
    <h3>LamP OAuth | Portal</h3>
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
    </form>
  </>)
}