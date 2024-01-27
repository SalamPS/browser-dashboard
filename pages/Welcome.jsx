import Time from "./Time";
import Cookies from 'js-cookie';

const Short = () => {
  return (<>
    <div className="short">

    </div>
  </>)
}

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
            
          </div>
        </div>
      </div>
    </div>
  </>)
}