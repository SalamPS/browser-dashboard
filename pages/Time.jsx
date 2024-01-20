'use client'

import { useState, useEffect } from "react";

// Monospace font standalone for each of it's character
// Make sure the font-type is monospace if you want to change it
import { Chivo_Mono } from "next/font/google";
const font = Chivo_Mono({ subsets: ['latin'], weight:'400' })

export default function Time () {
  // Initialize Time by Client current Date
  const [Time, setTime] = useState(0);
  useEffect(() => {
    setTime(new Date())
  }, [])

  // Use Time from useState as Reference for the Clock
  const Hour = Time ? Time.getHours() : 0;
  const Mins = Time ? Time.getMinutes() : 0;
  const Secs = Time ? Time.getSeconds() : 0;

  useEffect(() => {
    // setTime every 1000ms (1s)
    const runClock = setInterval(() => {
      setTime(new Date())
      if (Secs === 59) clearInterval(runClock)
    }, 1000);

    return () => clearInterval(runClock)
  }, [Secs])

  return (
    <div id='clock' className={font.className}>
      {/* Time Format is 24 Hour, 60 Minutes, 60 Seconds */}
      {/* Validating Hour,Mins,Secs as it is more than 10 to give an extra 0 in front of it */}
      <div className={`time hour`}>{Hour < 10 ? '0' : ''}{Hour}</div>
      {':'}
      <div className={`time mins`}>{Mins < 10 ? '0' : ''}{Mins}</div>
      {':'}
      <div className={`time secs`}>{Secs < 10 ? '0' : ''}{Secs}</div>
    </div>
  );
}