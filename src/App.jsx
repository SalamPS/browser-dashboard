/* eslint-disable react/prop-types */
import { useState } from "react"
import Clock from "./Clock"

const Widget = ({isEmpty, newBlock}) => {
  return (
    <div className={`block ${isEmpty ? 'empty' : ''}`}>
      {isEmpty?
      <div className="widget insert" onClick={newBlock}>
        <span>+</span>
      </div>
      :
      <div className="widget feat">
        <div className="body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, delectus?</div>
      </div>}
    </div>
  )
}

export default function App () {
  const [Block, setBlock] = useState([
    // {},
    {isEmpty: true},
  ])

  const newBlock = () => {
    const copy = Block.slice();
    if(copy.length == 4) copy.pop();
    copy.splice(copy.length-2, 0, {});
    setBlock(copy)
  }
  const removeBlock = () => {
    const copy = Block.slice();
    if(copy.length == 4) copy.pop();
    copy.splice(copy.length-2, 0, {});
    setBlock(copy)
  }

  return (<>
    <main>
      <div className="container">
        <div className="todo">
          <h1>
            ToDo
          </h1>
        </div>
        <div className="blocks">
          <div className="box">
            <div className="welcome">
              <div className="inner">
                <div className="pad">
                  <span className="head">Welcome, Salam <Clock/></span>
                </div>
              </div>
            </div>
            {Block.map((content, i) => (<Widget key={i} 
              isEmpty={content.isEmpty}
              newBlock={newBlock}
            />))}
          </div>
          <div className="watermark">
            <span>By LamP</span>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </main>
  </>)
}