/* eslint-disable react-hooks/exhaustive-deps */

export default function Quotes ({remove, id}) {
  return ( <>
    <h2>
      <span>Quotes</span>
      <i className="bi bi-dash-circle-fill delete" onClick={() => {remove(id)}}></i>
    </h2>
  </>)
}