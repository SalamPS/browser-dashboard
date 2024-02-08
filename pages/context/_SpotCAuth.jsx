import { useState } from "react";

export default function SpotCAuth ({toggle}) {
  const [SpotAuth, setSpotAuth] = useState([])

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSpotAuth(JSON.parse(reader.result))
      };
      reader.readAsText(file)
    }
  };

  const resetAuth = () => {
    setSpotAuth([])
    localStorage.setItem('widget_spotTask', [])
  }

  const saveAuth = () => {
    localStorage.setItem('widget_spotTask', JSON.stringify(SpotAuth))
  }

  return (<>
    <input className="upload" type="file" name="SpotAuth" onChange={handleUpload} />
    
    <div className="button">
      <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); toggle(false)}}>Cancel</button>
      <button id="submit" type="reset" title="Reset SPOT List" onClick={(e) => {resetAuth(e)}}>Reset</button>
      <button id="submit" type="submit" title="Save SPOT List" onClick={(e) => {saveAuth(e)}}>Submit</button>
    </div>
  </>);
}