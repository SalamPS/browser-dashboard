/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFile } from "./_SpotContext";
import Link from "next/link";

export default function SpotWidget ({fetchWidget, type, remove, id, setTogglePopup}) {
  const {SpotData, setSpotData} = useFile()

  useEffect(() => {
    const dest = `widget_${type}`
    const old = localStorage.getItem(dest)
    if (old) setSpotData(JSON.parse(old))
    else {
      localStorage.setItem(dest, JSON.stringify([]))
      setSpotData([])
    }
    fetchWidget(dest, setSpotData)
  }, [])

  const formatDate = (date) => {
    date = new Date(date * 1000); // Convert seconds to milliseconds
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('id-ID', options).replace('pukul', '|');
  };

  const formatDead = (req) => {
    if (req > 259200) return 'safe'
    else if (req > 86400) return 'hint'
    else return 'warn'
  }

  const importList = () => {
    
  }

  return (<>
    <h2>
      <span>
        Tugas SPOT
        <i className="bi bi-file-earmark-plus-fill edit" onClick={() => {setTogglePopup('SpotAuth')}}></i>
      </span>
      <i className="bi bi-dash-circle-fill delete" onClick={() => {remove(id)}}></i>
    </h2>
    <div className="taskList">
    {!SpotData ? '' : SpotData.map((task,i) => {
      return ( 
        <Link className="spotTask" key={i}
          href={task.url.startsWith('http') ? task.url : `http://${task.url}`}
          target="_blank">
          <div className={`mark ${formatDead((task.dead - Math.floor(new Date().getTime()/1000)))}`}></div>
          <div className="details">
            <p className="title">{task.matkul.split(' ').map(word => word != 'dan' ? word[0] : '')} - {task.name}</p>
            <p className="dead">{formatDate(task.dead)}</p>
          </div>
        </Link>
      )}
    )}
    </div>
  </>)
}