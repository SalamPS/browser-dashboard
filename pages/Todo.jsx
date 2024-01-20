import { useState, useEffect } from "react";

export default function Todo () {
  const storageKey = 'userConfig';
  const [userConfig, setUserConfig] = useState({
    name: {},
    todo: [
      {
        title: "Create your Dashboard",
        desc: "Create an account and customize yours!",
        dead: 1705728382,
        made: 1705641982,
        important: false
      }
    ],
    widget: [
      {}
    ]
  });
  const formatDate = (date) => {
    date = new Date(date * 1000)
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-GB', options);
  };
  const formatDead = (req) => {
    if (req > 259200) return 'safe'
    else if (req > 86400) return 'hint'
    else return 'warn'
  }

  useEffect(() => {
    formatDate(new Date().getTime())
    const storedUserConfig = localStorage.getItem(storageKey);
    if (storedUserConfig) {
      setUserConfig(JSON.parse(storedUserConfig));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(userConfig));
  }, [userConfig]);
  
  return (<>
    <div className="todo">
      <h1>ToDo</h1>
      <div className="todolist">
        {userConfig.todo.map((list, i) => {
          const isDead = formatDead(new Date().getTime() - list.dead)
          return (
            <div className={`list ${isDead}`} key={i}>
              <div className={`mark ${isDead}`}/>
              <div className="info">
                <h2>{list.title}</h2>
                <p>{'20/01/24, 12:15:43'}</p>
              </div>
              <div className="edit">
                <div className="bi bi-pencil-square"></div>
                <div className="bi bi-trash3-fill"></div>
              </div>
            </div>
          )})}
      </div>
    </div>
  </>)
}