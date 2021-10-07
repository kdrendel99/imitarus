import React from "react";
import Header from "./Header";
// import Footer from './Footer';
import Main from './Main';
import { AuthProvider } from './contexts/AuthContext';
// import Signin from "./users/SignIn";
// import Signup from "./users/SignUp";
// import {storage} from "../firebase"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import * as firebase from 'firebase';
// import GlobalStyle from "../globalStyles";


function App(){
  return (
    <React.Fragment>
      <AuthProvider>
      <React.StrictMode>
        {/* <GlobalStyle /> */}
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
        {/* <Footer /> */}
      {/* </Router> */}
      </React.StrictMode>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;