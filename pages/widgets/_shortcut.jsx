/* eslint-disable @next/next/no-img-element */
export default function Shortcut ({userConfig, setTogglePopup}) {
  return (
  <div className="shortcut">
    {!userConfig ? <></> :
    userConfig.short.map((item) => {
      return (
        <div className="short cut" key={item.id_short}>
          <div className="delete">
            <div className="x" onClick={() => {console.log('delete')}}>x</div>
          </div>
          <a target="_blank" href={item.url.startsWith('http') ? item.url : `http://${item.url}`}>
            {!item.favicon ? <div className="alternate">{item.name[0]}</div> 
            : <img src={`https://logo.clearbit.com/${item.url.replace(/^(https?:|)\/\//, '')}`} alt={item.name} />}
            <br />
          </a>
          <div className="text">
            <span>{item.name}</span>
          </div>
        </div>
      )
    })}
    {userConfig.short.length > 4 ? '' : 
    <div className="short add">
      <button onClick={() => {
        setTogglePopup('Short')
      }}>+</button>
    </div>}
  </div>
)}