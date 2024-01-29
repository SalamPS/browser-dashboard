/* eslint-disable react-hooks/exhaustive-deps */
import { Exo_2 } from 'next/font/google'
const font = Exo_2({ subsets: ['latin'] })

export default function Merge ({storageKey, savedConfig, setSavedConfig, userConfig, setUserConfig, Valid, setValid}) {
  const revalidate = () => setValid({todo:true, widget: true})
  const pushData = async (dest) => {
    const newData = userConfig[dest].filter(unknown => !savedConfig[dest].find(known => known[`id_${dest}`] === unknown[`id_${dest}`]));
    if (newData.length) {
      try {
        const response = await fetch(`/api/default?dest=${dest}&type=merge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error during POST request:', error);
      }
    }
  }
  const putData = async (dest) => {
    const oldData = userConfig[dest].filter(unknown => savedConfig[dest].find(known => known[`id_${dest}`] === unknown[`id_${dest}`]));
    const updatedData = oldData.filter(old => !savedConfig[dest].find(known => JSON.stringify(known) === JSON.stringify(old)));
    if (updatedData.length) {
      try {
        const response = await fetch(`/api/default?dest=${dest}&type=merge`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error during POST request:', error);
      }
    }
  }
  
  return (<>
    <div id="merge" className={font.className}>
      {!Valid ? '' : 
      <div className="confirm">
        <h1>Unsynchronized Data</h1>
        Data{' '}
        {!Valid.todo ? <span className='invalid'>todo-list</span> : ''}
        {(!Valid.todo && !Valid.widget) ? ' dan ' : ''}
        {!Valid.widget ? <span className='invalid'>widget</span> : ''}
        {' '}yang ada di browser anda dan di database online berbeda.
        <br />
        Silahkan lakukan pilihan merging data
        <br />
        <div className="choice">
          <button className={font.className}
            onClick={() => {
              revalidate()
              setUserConfig(savedConfig)
            }}>
            Prioritaskan
            <br />
            Data Online
          </button>
          <button className={font.className}
            onClick={async () => {
              revalidate()
              pushData('todo')
              putData('todo')
              pushData('short')
              putData('short')
            }}>
            Prioritaskan
            <br />
            Data Offline
          </button>
        </div>
      </div>}
    </div>
  </>)
}