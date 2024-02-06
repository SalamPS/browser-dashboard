/* eslint-disable @next/next/no-img-element */
export default function Shortcut ({ userConfig, setUserConfig, setTogglePopup }) {
  const Del = async (id) => {
    try {
      const copy = [...userConfig.short]
      const newCopy = copy.filter(short => short.id_short != id)
      setUserConfig(prev => ({
        ...prev,
        ['short']: newCopy
      }))
      const response = await fetch(`/api/default?dest=short&id=${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
      console.error('Error during DELETE request:', error);
    }
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
    {userConfig.short.length > 4 ? '' : 
    <div className="short add">
      <button onClick={() => {
        setTogglePopup('Short')
      }}>+</button>
    </div>}
  </div>
)}