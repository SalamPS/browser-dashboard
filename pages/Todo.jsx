/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Global } from "./Xcontainer";

const TodoList = ({markDone}) => {
  const { userConfig, setTogglePopup, setTodoEdit } = Global()
  // Format Deadline into an usable string
  // safe -> More than 3 days from the deadline
  // hint -> Less than 3 days from the deadline
  // warn -> Less than 1 day from the deadline
  const formatDead = (req) => {
    if (req > 25920000) return 'safe'
    else if (req > 8640000) return 'hint'
    else return 'warn'
  }

  // Format date to be Readable
  // Output Example -> 20/01/24, 12:15:43
  const formatDate = (date) => {
    date = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-GB', options);
  };

  return (<>
    {!userConfig ? '' : userConfig.todo.map((list, i) => {
      // 
      // Initialize deadline marker
      // Changed it's color according to it's time delta
      const isDead = formatDead(list.dead - Math.floor(new Date().getTime()))
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
          <div className="info"
            onClick={() => {setTogglePopup('TodoEdit'); setTodoEdit(list.id_todo)}}
            >
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

export default function Todo () {
  const {storageKey, userConfig, setUserConfig, setTogglePopup } = Global()
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Data Todo is Done
  // Mark the chosen to-do list as cleared
  const markDone = async (id) => {
    const update = { ...userConfig }
    const write = (value) => {
      update.todo.find(list => list.id_todo == id).clear = value
      setUserConfig(update)
      localStorage.setItem(storageKey, JSON.stringify(update))
    }
    write(1)
    await delay(200)
    write(2)
    await delay(200)
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

  
  return (<>
    <div className="todo">
      <h1>ToDo</h1>
      <div className="todolist">
        {/* Render Client's todo list */}
        <TodoList markDone={markDone}/>
        {/* Add New todo list */}
        <div className="list add" onClick={() => {setTogglePopup('TodoNew')}}>
          +
        </div>
      </div>
    </div>
  </>)
}