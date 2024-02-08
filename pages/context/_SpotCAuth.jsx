import { useState } from "react";
import { useFile } from "./_SpotContext";

export default function SpotAuth ({toggle}) {
  const [SpotAuth, setSpotAuth] = useState([])
  const {SpotData, setSpotData} = useFile()

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

  const setAuth = (data) => {
    localStorage.setItem('widget_spotTask', JSON.stringify(data))
    setSpotData(data)
    setSpotAuth(data)
    location.reload()
  }

  return (<>
    <input className="upload" type="file" name="SpotAuth" onChange={handleUpload} />
    
    <div className="button">
      <button id="cancel" title="Cancel" onClick={(e) => {e.preventDefault(); toggle(false)}}>Cancel</button>
      <button id="submit" type="reset" title="Reset SPOT List" onClick={(e) => {setAuth([])}}>Reset</button>
      <button id="submit" type="submit" title="Save SPOT List" onClick={(e) => {setAuth(SpotAuth)}}>Submit</button>
    </div>
  </>);
}