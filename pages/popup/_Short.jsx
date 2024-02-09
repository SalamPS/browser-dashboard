import { useEffect, useState } from "react";
import { Global } from "../Xcontainer"

export default function Short () { 
  const { setTogglePopup, POST } = Global() 
  const [shortFormData, setshortFormData] = useState({
    id_short: 0,
    name: '',
    url: '',
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
      
      POST('short', validated)
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
    setTogglePopup(false)
  }
  const handleChange = (name, value) => {
    setshortFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  useState(() => {
    handleChange('id_short', Math.floor(new Date().getTime() / 1000))
  }, [])

  return (
  <form>
    <h3>New Shortcut</h3>
    <label>
      <span className='span'>Name</span>
      <input
        className="input"
        type="text"
        name="name"
        value={shortFormData.name}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
    </label>
    <label>
      <span className='span'>Link</span>
      <input
        className="input"
        type="text"
        name="url"
        value={shortFormData.url}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
    </label>
    <div className="button">
      <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); setTogglePopup(false)}}>Cancel</button>
      <button id="submit" type="submit" title="Save new Shortcut" onClick={(e) => {saveShort(e)}}>Submit</button>
    </div>
  </form>)
}