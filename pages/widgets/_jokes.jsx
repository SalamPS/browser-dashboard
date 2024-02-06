/* eslint-disable react-hooks/exhaustive-deps */

export default function Jokes ({remove, id}) {
  return ( <>
    <h2>
      <span>Jokes</span>
      <i className="bi bi-dash-circle-fill delete" onClick={() => {remove(id)}}></i>
    </h2>
  </>)
}