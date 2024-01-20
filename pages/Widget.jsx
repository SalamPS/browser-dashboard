'use client'

/* eslint-disable react/prop-types */
import { useState } from "react"

const Box = ({isEmpty, newBlock, name}) => {
  const widgets = [
    {
      name: 'tugas',
      content: <>
        <h2>List Tugas</h2>
      </>
    }
  ]
  const Widget = ({name}) => {
    return widgets.find(widget => widget.name == name).content
  }

  return (
    <div className={`block ${isEmpty ? 'empty' : ''}`}>
      {isEmpty?
      <div className="widget insert" onClick={newBlock}>
        <span>+</span>
      </div>
      :
      <div className="widget feat">
        <div className="body">
          <Widget name={name}/>
        </div>
      </div>}
    </div>
  )
}

export default function Widget () {
  const [Block, setBlock] = useState([
    {name: 'tugas'},
    {isEmpty: true},
  ])

  const newBlock = () => {
    const copy = Block.slice();
    if(copy.length == 4) copy.pop();
    copy.splice(copy.length-2, 0, {name: 'tugas'});
    setBlock(copy)
  }
  const removeBlock = () => {
    const copy = Block.slice();
    if(copy.length == 4) copy.pop();
    copy.splice(copy.length-2, 0, {});
    setBlock(copy)
  }

  return (<>
    {Block.map((content, i) => (<Box key={i} 
      isEmpty={content.isEmpty}
      newBlock={newBlock}
      name={content.name}
    />))}
  </>)
}