import { useState, useEffect } from "react";

export default function Todo () {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Set Client Configuration in Cache for offline usage and API Controls
  const storageKey = 'userConfig';
  const [userConfig, setUserConfig] = useState({
    name: {},
    todo: [
      {
        title: "Create your Dashboard",
        desc: "Create an account and customize yours!",
        dead: 1705728382,
        made: 1705641982,
        index: 0,
        clear: 0,
        important: false,
      },
      {
        title: "Customize your Account",
        desc: "Create an account and customize yours!",
        dead: 1705728382,
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

  // Format date to be Readable
  // Output Example -> 20/01/24, 12:15:43
  const formatDate = (date) => {
    date = new Date(date * 1000)
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-GB', options);
  };

  // Format Deadline into an usable string
  // safe -> More than 3 days from the deadline
  // hint -> Less than 3 days from the deadline
  // warn -> Less than 1 day from the deadline
  const formatDead = (req) => {
    if (req > 259200) return 'safe'
    else if (req > 86400) return 'hint'
    else return 'warn'
  }

  // Get recent cache from Client Local Storage
  // Gonna be Fetched first if Client is Online
  useEffect(() => {
    formatDate(new Date().getTime())
    const storedUserConfig = localStorage.getItem(storageKey);
    if (storedUserConfig) {
      setUserConfig(JSON.parse(storedUserConfig));
    }
  }, []);

  // Set new Values into Cache everytime Client makes any changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userConfig));
  }, [userConfig]);

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
  
  return (<>
    <div className="todo">
      <h1>ToDo</h1>
      <div className="todolist">
        {/* Render Client's todo list */}
        {userConfig.todo.map((list, i) => {
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
                <p>{'20/01/24, 12:15:43'}</p>
              </div>
              <div className="edit">
                <div className={`bi bi-check${list.clear ? '-circle-fill' : ''}`}
                  onClick={() => {markClear(i)}}
                />
              </div>
            </div>
          )})}
      </div>
    </div>
  </>)
}