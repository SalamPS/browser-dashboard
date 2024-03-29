import { useState } from "react"
import { Global } from "../Xcontainer"

export default function AddNew ({WidgetList}) {
  const { userConfig,  POST } = Global()
  const [Active, setActive] = useState(false)
  const AddNew = (type) => {
    const widget = {
      id_widget: Math.floor(new Date().getTime()),
      type: type,
    }
    POST('widget',widget)
    setActive(false)
  }

  return (
    <div className={`block empty ${Active ? 'active shadowBox shadowWidget' : 'plus'}`} 
      onClick={!Active ? () => {setActive(true)} : () => {}}>
      {!Active ? <span>+</span> : 
      <div className="add">
        <h2>
          <span>Add Widget</span>
          <i className="bi bi-x-circle-fill cancel" onClick={() => {setActive(false)}}></i>
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