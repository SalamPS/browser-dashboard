import { useState } from "react"

export default function AddNew ({userConfig, setUserConfig, WidgetList}) {
  const [Active, setActive] = useState(false)
  const AddNew = (type) => {
    const widget = {
      id_widget: Math.floor(new Date().getTime()/1000),
      type: type,
      id_ref: 0,
    }

    const copy = [...userConfig.widget]
    copy.push(widget)
    setUserConfig(prev => ({
      ...prev,
      ['widget']: copy
    }))

    fetch('/api/default?dest=widget', {
      method: 'POST',
      body: JSON.stringify(widget),
      headers: {'Content-Type': 'application/json'}
    }).catch(err => console.error('Error: ', err))

    setActive(false)
  }

  return (
    <div className={`block empty ${Active ? 'active shadowBox shadowWidget' : 'plus'}`} 
      onClick={!Active ? () => {setActive(true)} : () => {}}>
      {!Active ? <span>+</span> : 
      <div className="add">
        <h2>
          <span>Add Widget</span>
          <i class="bi bi-x-circle-fill cancel" onClick={() => {setActive(false)}}></i>
        </h2>
        <div className="choices">
          {WidgetList.map((item, i) => {
          if (!userConfig.widget.find(w => w.type == item.type))
          return (
            <div key={i} className="choice addNew" onClick={() => {AddNew(item.type)}} >
              <div className="left">
                <span className="bi bi-plus-circle"></span> {item.name}
              </div>
            </div>
          )})}

          {WidgetList.map((item, i) => {
          if (userConfig.widget.find(w => (w.type == item.type)))
          return (
            <div key={i} className="choice invalid">
              {item.name}
            </div>
          )})}
        </div>
      </div>}
    </div>
  )
}