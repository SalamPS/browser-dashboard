/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Global } from "../Xcontainer"

import Button from "./_Button";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function TodoEdit () {
  const { TodoEdit, userConfig, setTogglePopup, PUT } = Global()
  const [formData, setFormData] = useState({
    id_todo: TodoEdit,
    title: '',
    Desc: '',
    dead: '',
    Index: 0,
    clear: 0,
  })

  useEffect(() => {
    const known = userConfig.todo.find(todo => todo.id_todo == TodoEdit)
    known.dead = new Date(known.dead)

    setFormData(known)
  }, [])

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    const newConfig = {...formData}
    newConfig.dead = Math.floor((new Date(newConfig.dead).getTime()));
    PUT('todo',newConfig.id_todo, newConfig)

    setTogglePopup(false)
  }

  return (
    <form>
      <h3>Edit Todo-List</h3>
      <div className="userInput">
        <label>
          <span className='span'>Title</span>
          <input
            className="input"
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </label>
        <label>
          <span className='span'>Deadline</span>
          <ReactDatePicker
            selected={formData.dead}
            onChange={(date) => handleChange('dead', date)}
            showTimeSelect
            withPortal
            timeIntervals={1}
            minDate={new Date(TodoEdit)}
            dateFormat="dd-MM-yyyy | HH:mm:ss"
          />
        </label>
      </div>
      <label>
        <span className='span'>Description</span>
        <input
          className="input"
          type="text"
          name="Desc"
          value={formData.Desc}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </label>
      <Button action={[{text: 'Save', action: handleSubmit}]}/>
    </form>
  )
}