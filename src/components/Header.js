import React from 'react';
import { Link } from "react-router-dom";

function Header(){
  return(
    <React.Fragment>
      <h1>Imitarus</h1>
      <p>An AI-driven photosharing application</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
      <hr/>
    </React.Fragment>
  );
}

export default Header;