/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SpotTask ({fetchWidget, data}) {
  useEffect(() => {
    (async () => {
      fetchWidget('widget_spotTask')
    })();
  }, []);

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

  return ( <>
    <h2>List Tugas SPOT</h2>
    {!data ? '' : data.map(task => {
      return ( 
        <Link key={task.id_widget_spotTask} className="spotTask" 
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
  </>)
}