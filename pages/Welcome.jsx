import Time from "./Time";
import Cookies from 'js-cookie';

export default function Welcome () {
  // Cookies.set('token', 'eyJuYW1lIjoic2FsYW1wYXJhcnRhIiwiaG9zdCI6InNhbGFtcGFyYXJ0YSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.62St0g6EesPAu0JuqZyKGFEzZEJmp_C8PWlwD5U-d7Y', { expires: 7 });

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