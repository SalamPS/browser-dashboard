import Time from "./Time";

export default function Welcome () {
  return (<>
    <div className="welcome">
      <div className="inner">
        <div className="pad">
          <span className="head">
            <span>Welcome, Salam </span>
            <Time/>
          </span>
        </div>
      </div>
    </div>
  </>)
}