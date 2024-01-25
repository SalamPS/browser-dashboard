import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';

const TodoList = ({config, markDone}) => {
  // Format Deadline into an usable string
  // safe -> More than 3 days from the deadline
  // hint -> Less than 3 days from the deadline
  // warn -> Less than 1 day from the deadline
  const formatDead = (req) => {
    if (req > 259200) return 'safe'
    else if (req > 86400) return 'hint'
    else return 'warn'
  }

  // Format date to be Readable
  // Output Example -> 20/01/24, 12:15:43
  const formatDate = (date) => {
    date = new Date(date * 1000)
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-GB', options);
  };

  return (<>
    {config.todo.map((list, i) => {
      // 
      // Initialize deadline marker
      // Changed it's color according to it's time delta
      const isDead = formatDead(new Date().getTime() - list.dead)
      return (
        // If the clear property's value == 2, then hide
        list.clear == 2 ? <div key={i} className="clear2"></div> 
        // 
        : 
        // If the clear property's value != 2, then show
        // It handle clear event which will set clear value to 1, then 2
        <div key={i}
          className={`list${list.clear != 0 ? ` clear${list.clear}` : ''}`}>
          <div className={`mark ${isDead}`}/>
          <div className="info">
            <h2>{list.title}</h2>
            <p>{formatDate(list.dead)}</p>
          </div>
          <div className="edit">
            <div className={`bi bi-check${list.clear ? '-circle-fill' : ''}`}
              onClick={() => {markDone(list.id_todo)}}
            />
          </div>
        </div>
      )}
    )}
  </>)
}

const NewTodo = ({config, setConfig, setAdd}) => {
  const [formData, setFormData] = useState({
    id_todo: new Date().getTime(),
    title: '',
    Desc: '',
    dead: '',
    vital: 0,
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
      response.status(201)
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    
    if (name == 'date') console.log(value)
  }

  const handleSubmit = () => {
    config.todo.push(formData)
    config.todo[config.todo.length - 1].dead = Math.floor((new Date(config.todo[config.todo.length - 1].dead).getTime())/1000);
    config.todo[config.todo.length - 1].id_todo = Math.floor((config.todo[config.todo.length - 1].id_todo)/1000);
    setConfig(config)
    postData(formData)
    setAdd(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </label>
      <label>
        <span>Description</span>
        <input
          type="text"
          name="Desc"
          value={formData.Desc}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </label>
      <label>
        <span>Deadline</span>
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
      <label>
        <span>Important</span>
        <input
          type="checkbox"
          name="vital"
          checked={formData.vital}
          onChange={(e) => {handleChange(e.target.name, e.target.checked)}}
        />
      </label>
      <button id="submit" type="submit" title="Save new List">Submit</button>
      <button id="cancel" title="Cancel" onClick={() => {setAdd(false)}}>Cancel</button>
    </form>
  )
}

export default function Todo () {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  ///////////////////
  // Storage Setup
  // 
  // Set Client Configuration in Cache for offline usage and API Controls
  const storageKey = 'userConfig';
  const [userConfig, setUserConfig] = useState({
    todo: [],
    widget: []
  });

  // Get recent cache from Client Local Storage and Fetch from Database
  useEffect(() => {

    // FetchData with token
    const fetchData = async () => {
      try {
        const response = await fetch(`api/default`);
        if (response.ok) {
          const data = await response.json();
          if (data.length) {
            setUserConfig((prevData) => ({
              ...prevData,
              ['todo']: data,
            }))
          }
        } else {
          console.error('Failed to fetch default data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    const storedUserConfig = localStorage.getItem(storageKey);
    if (storedUserConfig) {
      setUserConfig(JSON.parse(storedUserConfig));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // Set new Values into Cache everytime Client makes any changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userConfig));
  }, [userConfig]);
  // 
  // 
  // Storage Setup End
  /////////////////// 
  

  // Data Todo is Done
  // Mark the chosen to-do list as cleared
  const markDone = async (id) => {
    const update = { ...userConfig }
    const write = (value) => {
      update.todo.find(list => list.id_todo == id).clear = value
      setUserConfig(update)
    }
    write(1)
    await delay(200)
    write(2)
    try {
      const response = await fetch(`/api/default?dest=todo&id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update.todo.find(list => list.id_todo == id)),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error during PUT request:', error);
    }
  }

  // AddNew Todo Trigger
  const [Add, setAdd] = useState(false)
  
  return (<>
    <div className="todo">
      <h1>ToDo</h1>
      <div className="todolist">
        {/* Render Client's todo list */}
        <TodoList config={userConfig} markDone={markDone}/>
        {/* Add New todo list */}
        {Add ? 
        <div className="list form">
          <NewTodo config={{...userConfig}} setConfig={setUserConfig} setAdd={setAdd}/>
        </div>
        : 
        <div className="list add" onClick={() => {setAdd(true)}}>
          +
        </div>}
      </div>
    </div>
  </>)
}