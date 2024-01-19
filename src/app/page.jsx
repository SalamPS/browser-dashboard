'use client'

/* eslint-disable react/prop-types */
import { useState } from "react"
import Clock from "@/components/Clock"

const Widget = ({isEmpty, newBlock, name}) => {
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

export default function Home () {
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
              name={content.name}
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