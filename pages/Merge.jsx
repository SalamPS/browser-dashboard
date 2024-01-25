/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Exo_2 } from 'next/font/google'
const font = Exo_2({ subsets: ['latin'] })

export default function Merge ({storageKey, savedConfig, setSavedConfig, userConfig, setUserConfig, Valid, setValid}) {
  const revalidate = () => setValid({todo:true, widget: true})
  
  // Set new Values into Cache everytime Client makes any changes

  return (<>
    <div id="merge" className={font.className}>
      <div className="confirm">
        <h1>Unsynchronized Data</h1>
        Data{' '}
        {(!Valid.todo) ? <span className='invalid'>todo-list</span> : ''}
        {(!(Valid.todo) && !(Valid.widget)) ? ' dan ' : ''}
        {(!Valid.widget) ? <span className='invalid'>widget</span> : ''}
        {' '}yang ada di browser anda dan di database online berbeda.
        <br />
        Silahkan lakukan pilihan merging data
        <br />
        <div className="choice">
          <button className={font.className}
            onClick={() => {
              revalidate()
              setUserConfig(savedConfig)
              localStorage.setItem(storageKey, JSON.stringify(userConfig));
            }}>
            Prioritaskan
            <br />
            Data Online
          </button>
          <button className={font.className}
            onClick={() => {
              revalidate()
              setSavedConfig(userConfig)
            }}>
            Prioritaskan
            <br />
            Data Offline
          </button>
        </div>
      </div>
    </div>
  </>)
}