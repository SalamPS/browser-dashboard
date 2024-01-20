'use client'

import { useState, useEffect } from "react";
import { Chivo_Mono } from "next/font/google";
const font = Chivo_Mono({ subsets: ['latin'], weight:'400' })

export default function Time () {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [Time, setTime] = useState(0);

  useEffect(() => {
    setTime(new Date())
  }, [])

  const Hour = Time ? Time.getHours() : 0;
  const Mins = Time ? Time.getMinutes() : 0;
  const Secs = Time ? Time.getSeconds() : 0;

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date())
    };
    
    const runClock = setInterval(() => {
      updateClock();
      if (Secs === 59) clearInterval(runClock)
    }, 1000);

    return () => clearInterval(runClock)
  }, [Secs])

  return (
    <div id='clock' className={font.className}>
      <div className={`time hour`}>{Hour < 10 ? '0' : ''}{Hour}</div>
      {':'}
      <div className={`time mins`}>{Mins < 10 ? '0' : ''}{Mins}</div>
      {':'}
      <div className={`time secs`}>{Secs < 10 ? '0' : ''}{Secs}</div>
    </div>
  );
}