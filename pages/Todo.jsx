import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const TodoList = ({config, markClear}) => {
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
              onClick={() => {markClear(i)}}
            />
          </div>
        </div>
      )}
    )}
  </>)
}

const NewTodo = ({config, setConfig, setAdd}) => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    dead: '',
    important: false,
    made: new Date().getTime(),
    index: 0,
    clear: 0,
  })

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    config.todo.push(formData);
    setConfig(config)
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
          name="desc"
          value={formData.desc}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </label>
      <label>
        <span>Deadline</span>
        <ReactDatePicker
          selected={formData.dead}
          onChange={(date) => handleChange('dead', date)}
          showTimeSelect
          timeIntervals={1}
          dateFormat="yyyy-MM-dd HH:mm:ss"
        />
      </label>
      <label>
        <span>Important</span>
        <input
          type="checkbox"
          name="important"
          checked={formData.important}
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
    name: {},
    todo: [
      {
        title: "Create your Dashboard",
        desc: "Create an account and customize yours!",
        dead: 1705721382,
        made: 1705641982,
        index: 0,
        clear: 0,
        important: false,
      }
    ],
    widget: [
      {}
    ]
  });

  // Get recent cache from Client Local Storage
  // Gonna be Fetched first if Client is Online
  useEffect(() => {
    const storedUserConfig = localStorage.getItem(storageKey);
    if (storedUserConfig) {
      setUserConfig(JSON.parse(storedUserConfig));
    }
  }, []);

  // Set new Values into Cache everytime Client makes any changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userConfig));
  }, [userConfig]);
  // 
  // 
  // Storage Setup End
  /////////////////// 

  // Mark the chosen to-do list as cleared
  const markClear = async (index) => {
    const write = (value) => {
      const update = { ...userConfig }
      update.todo[index].clear = value
      setUserConfig(update)
    }
    write(1)
    await delay(200)
    write(2)
  }

  // AddNew Todo Trigger
  const [Add, setAdd] = useState(false)
  
  return (<>
    <div className="todo">
      <h1>ToDo</h1>
      <div className="todolist">
        {/* Render Client's todo list */}
        <TodoList config={userConfig} markClear={markClear}/>
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