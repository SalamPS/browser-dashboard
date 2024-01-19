import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []); // Efek hanya dijalankan sekali setelah render pertama

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <span id='clock'>
      {hours < 10 ? '0' : ''}{hours}:
      {minutes < 10 ? '0' : ''}{minutes}:
      {seconds < 10 ? '0' : ''}{seconds}
    </span>
  );
};

export default Clock;
