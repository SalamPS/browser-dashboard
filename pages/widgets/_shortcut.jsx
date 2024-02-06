import { useEffect, useState } from "react"

/* eslint-disable @next/next/no-img-element */
export default function Shortcut ({ userConfig, setUserConfig, setTogglePopup }) {
  const [empty, setEmpty] = useState(true)
  useEffect(() => {
    if (userConfig.short.length) setEmpty(false)
    else setEmpty(true)
  }, [userConfig])

  const Del = async (id) => {
    const copy = [...userConfig.short]
    const newCopy = copy.filter(short => short.id_short != id)
    setUserConfig(prev => ({
      ...prev,
      ['short']: newCopy
    }))
    fetch(`/api/default?dest=short&id=${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }).catch(err => console.error('Error: ', err));
  }

  return (
  <div className="shortcut">
    {!userConfig ? <></> :
    userConfig.short.map((item) => {
      return (
        <div className="short cut" key={item.id_short}>
          <div className="delete">
            <div className="x" onClick={() => {Del(item.id_short)}}>x</div>
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
    {empty > 4 ? '' : 
    <div className={`short add ${empty ? 'empty' : ''}`}>
      <button onClick={() => {
        setTogglePopup('Short')
      }}>+</button>
    </div>}
  </div>
)}