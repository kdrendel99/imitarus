import React from "react";
import Header from "./Header";
import Main from './Main';
import Signin from "./SignIn";
import Signup from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import * as firebase from 'firebase';


function App(){
  return (
    <React.Fragment>
      {/* <Router> */}
      <Header />
      {/* <Switch> */}
        {/* <Route path="/signin"> */}
          {/* <Signin /> */}
        {/* </Route> */}
        {/* <Route path="/signup"> */}
          {/* <Signup /> */}
        {/* </Route> */}
        {/* <Route path ="/"> */}
          <Main />
        {/* </Route> */}
      {/* </Switch> */}
    {/* </Router> */}
    </React.Fragment>
  );
}

export default App;