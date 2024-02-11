/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { Chivo_Mono } from "next/font/google";
const font = Chivo_Mono({ subsets: ['latin'], weight:'400' })

export default function JadwalShalat ({remove, id}) {
  const [City, setCity] = useState('1201')
  const [Data, setData] = useState(
    {
      id:0,
      lokasi:"",
      daerah:"",
      jadwal:{tanggal:"", imsak:"", subuh:"", terbit:"", dhuha:"", dzuhur:"", ashar:"", maghrib:"", isya:"", date:""}
    }
  )
  
  useEffect(() => {
    if (City) {
      const date = new Date(Date.now())
      const req = `https://api.myquran.com/v2/sholat/jadwal/${City}/`
      + (date.getFullYear()) + '-'
      + (date.getMonth()+1) + '-'
      + (date.getDate())

      fetch(req)
      .then(async res => {
        const result = await res.json()
        setData(result.data)
      })
      .catch(err => console.error('Error:', err))
    }
  }, [])

  const Shalat = ({type}) => {
    return (<div className={`shalat ${type}`}>
      <span className="name">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <span className={`time ${font.className}`}>
        {Data.jadwal[type]}
      </span>
    </div>)
  }

  return ( <>
    <h2>
      <span>Jadwal Shalat</span>
      <i className="bi bi-dash-circle-fill delete" onClick={() => {remove(id)}}></i>
    </h2>
    {City ? 
    <div className="taskList shalatList view">
      <Shalat type={'subuh'}/>
      <Shalat type={'dzuhur'}/>
      <Shalat type={'ashar'}/>
      <Shalat type={'maghrib'}/>
      <Shalat type={'isya'}/>
    </div>
    : 
    <div className="taskList shalatList">
    </div>}
  </>)
}