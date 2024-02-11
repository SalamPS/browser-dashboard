/* eslint-disable react-hooks/exhaustive-deps */

export default function JadwalShalat ({remove, id}) {
  return ( <>
    <h2>
      <span>Jadwal Shalat</span>
      <i className="bi bi-dash-circle-fill delete" onClick={() => {remove(id)}}></i>
    </h2>
  </>)
}