import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function Todo ({storageKey, config, setConfig, toggle}) {
  const [formData, setFormData] = useState({
    id_todo: new Date().getTime(),
    title: '',
    Desc: '',
    dead: '',
    Index: 0,
    clear: 0,
  })
  
  const postData = async (data) => {
    try {
      const response = await fetch('/api/default?dest=todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    const newConfig = {...config}
    newConfig.todo.push(formData)
    newConfig.todo[newConfig.todo.length - 1].dead = Math.floor((new Date(newConfig.todo[newConfig.todo.length - 1].dead).getTime())/1000);
    newConfig.todo[newConfig.todo.length - 1].id_todo = Math.floor((newConfig.todo[newConfig.todo.length - 1].id_todo)/1000);
    localStorage.setItem(storageKey, JSON.stringify(newConfig))
    setConfig(newConfig)
    postData(formData)
    toggle(false)
  }

  return (
    <form>
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
        <span className='span'>Description</span>
        <input
          className="input"
          type="text"
          name="Desc"
          value={formData.Desc}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </label>
      <label>
        <span className='span'>Deadline</span>
        <ReactDatePicker
          selected={formData.dead}
          onChange={(date) => handleChange('dead', date)}
          showTimeSelect
          isClearable
          withPortal
          timeIntervals={1}
          minDate={new Date()}
          dateFormat="dd-MM-yyyy | HH:mm:ss"
        />
      </label>
      <div className="button">
        <button id="cancel" title="Cancel" onClick={(e) => {
          e.preventDefault()
          toggle(false)
        }}>Cancel</button>
        <button id="submit" title="Save new List" onClick={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>Post</button>
      </div>
    </form>
  )
}