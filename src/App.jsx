/* eslint-disable react/prop-types */
import { useState } from "react"

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
    {},
    {isEmpty: true},
  ])

  const newBlock = () => {
    const copy = Block.slice();
    if(copy.length == 6) copy.pop();
    copy.splice(copy.length-2, 0, {});
    setBlock(copy)
  }
  const removeBlock = () => {
    const copy = Block.slice();
    if(copy.length == 6) copy.pop();
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
            {Block.map((content, i) => (<Widget key={i} 
              isEmpty={content.isEmpty}
              newBlock={newBlock}
            />))}
          </div>
          <div>By LamP</div>
        </div>
      </div>
    </main>
  </>)
}