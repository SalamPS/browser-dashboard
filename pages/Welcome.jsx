/* eslint-disable @next/next/no-img-element */
import Time from "./Time";
import Cookies from 'js-cookie';

export default function Welcome ({savedConfig, setSavedConfig, storageKey, userConfig, setUserConfig, Valid, setValid}) {
  Cookies.set('token', 'eyJuYW1lIjoic2FsYW1wYXJhcnRhIiwiaG9zdCI6InNhbGFtcGFyYXJ0YSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.62St0g6EesPAu0JuqZyKGFEzZEJmp_C8PWlwD5U-d7Y', { expires: 7 });

  return (<>
    <div className="welcome">
      <div className="inner">
        <div className="pad">
          <div className="head">
            <span>Welcome, Salam </span>
            <Time/>
          </div>
          <div className="shortcut">
            {!userConfig ? <></> :
            userConfig.short.map((item) => (
              <a href={item.url} className="short" key={item.id_short} target="_blank">
                <img src={item.favicon} alt={item.name} /> <br />
                <span>{item.name}</span>
              </a>
            ))}
            {userConfig.short.length > 6 ? '' : 
            <div className="short">
              <div className="add">
                <button>
                  +
                </button>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </>)
}