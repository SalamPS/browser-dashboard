import { useState } from "react";
import { useFile } from "./_SpotContext";
import Cookies from "js-cookie";

export default function SpotAuth ({toggle}) {
  const [SpotJSON, setSpotJSON] = useState([])
  const [SpotAuth, setSpotAuth] = useState('')
  const {SpotData, setSpotData} = useFile()

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSpotJSON(JSON.parse(reader.result))
      };
      reader.readAsText(file)
    }
  };

  const saveAuth = () => {
    if (SpotJSON.length) {
      setSpotAuth('')
      setSpotData(SpotJSON)
      localStorage.setItem('widget_spotTask', JSON.stringify(SpotJSON))
    }
    else if (SpotAuth.length == 7 && SpotAuth !== NaN) {
      Cookies.set('NIM', 2202747)
    }
    location.reload()
  }
  const resetAuth = () => {
    localStorage.setItem('widget_spotTask', JSON.stringify([]))
    setSpotData([])
    setSpotAuth([])
    setSpotJSON([])
    location.reload()
  }

  return (<>
    
    <form>
      <div className="auth">
        <label htmlFor="NIM" className="NIM">
          <span className='span'>Sync Task by NIM</span>
          <input
            className="input"
            type="text"
            value={SpotAuth}
            onChange={(e) => setSpotAuth(e.target.value)}
          />
        </label>
        <div className="divider">
          or
        </div>
        <div className="JSON">
          <span className='span'>Sync Task by JSON</span>
          <label htmlFor="JSON" className="upload">
            <span><i className="bi bi-file-earmark-plus-fill edit">{' '}</i>Upload</span>
            <input type="file" id="JSON" name="SpotAuth" onChange={handleUpload} style={{display: 'none'}}/>
          </label>
        </div>
      </div>
      <div className="button">
        <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); toggle(false)}}>Cancel</button>
        <button id="submit" type="reset" title="Reset SPOT List" onClick={(e) => {resetAuth([])}}>Reset</button>
        <button id="submit" type="submit" title="Save SPOT List" onClick={(e) => {saveAuth()}}>Submit</button>
      </div>
    </form>
  </>);
}