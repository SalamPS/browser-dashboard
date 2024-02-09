import { Global } from "../Xcontainer";

export default function Button ({action,close}) {
  const {setTogglePopup} = Global()

  return (
  <div className="button">
    <button id="cancel" title="Exit" 
    onClick={(e) => {
      e.preventDefault();
      close ? close() : () => {}
      setTogglePopup(false)
    }}>
      Exit
    </button>
    {action.map((action, i) => (
      <button key={i} id="submit" type="submit" title={action.text} onClick={(e) => {action.action(e)}}>{action.text}</button>
    ))}
  </div>)
}