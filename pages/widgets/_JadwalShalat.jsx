/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { Chivo_Mono } from "next/font/google";
const font = Chivo_Mono({ subsets: ['latin'], weight:'400' })

export default function JadwalShalat ({remove, id}) {
  const [Cities, setCities] = useState([{id: "", lokasi: ""}])
  const [Search, setSearch] = useState('')
  const [City, setCity] = useState({id: "", lokasi: ""})
  const [Data, setData] = useState(
    {
      id:0,
      lokasi:"",
      daerah:"",
      jadwal:{tanggal:"", imsak:"", subuh:"", terbit:"", dhuha:"", dzuhur:"", ashar:"", maghrib:"", isya:"", date:""}
    }
  )

  const fetcher = (url,action) => {
    fetch(url)
    .then(async res => {
      const result = await res.json()
      action(result.data)
      return result.data
    })
    .catch(err => console.error('Error:', err))
  }

  const today = () => {
    const date = new Date(Date.now())
    const req = `https://api.myquran.com/v2/sholat/jadwal/${City.id}/`
    + (date.getFullYear()) + '-'
    + (date.getMonth()+1) + '-'
    + (date.getDate())
    return req;
  }
  
  useEffect(() => {
    const known = JSON.parse(localStorage.getItem('location'))
    if (City.id || known) {
      setCity(known)
      fetcher(today(),setData)
    }
  }, [])

  useEffect(() => {
    if (City.id) fetcher(today(),setData)
  }, [City])

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

  const searchCity = () => {
    if (Search) {
      fetcher(`https://api.myquran.com/v2/sholat/kota/cari/${Search.toLowerCase()}`,setCities)
    }
  }

  return ( <>
    <h2>
      <span>Jadwal Shalat</span>
      <i className="bi bi-dash-circle-fill delete" onClick={() => {remove(id)}}></i>
    </h2>
    {City.id ? 
    <div className="shalatList view">
      <Shalat type={'subuh'}/>
      <Shalat type={'dzuhur'}/>
      <Shalat type={'ashar'}/>
      <Shalat type={'maghrib'}/>
      <Shalat type={'isya'}/>
    </div>
    : 
    <div className="shalatSelect">
      <form>
        <span className="not">
          Cari lokasi:
        </span>
        <div className="search">
          <input 
            type="text" 
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={(e) => {e.preventDefault(); searchCity();}}>
            <span className="bi bi-search"></span>
          </button>
        </div>
      </form>

      {!Search ? '' : <div className="shalatList">
        {Cities.map((city,i) => (
          <div key={i} className="city" onClick={() => {
            setCity(city)
            localStorage.setItem('location', JSON.stringify(city))
          }}>
            {city.lokasi}
          </div>
        ))}
      </div>}
    </div>}
  </>)
}