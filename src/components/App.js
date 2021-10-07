import React from "react";
import Header from "./Header";
// import Footer from './Footer';
import Main from './Main';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signin from "./users/SignIn";
import Signup from "./users/SignUp";
import ForgotPassword from './ForgotPassword';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './users/UpdateProfile';
// import {storage} from "../firebase"
// import * as firebase from 'firebase';
// import GlobalStyle from "../globalStyles";


function App(){
  return (
    <React.Fragment>
        <React.StrictMode>
          {/* <GlobalStyle /> */}
          <Router>
            <AuthProvider>
            <Header />
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <Route exact path ="/" component={Main}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Signin}/> 
            <Route path="/forgot-password" component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
        </React.StrictMode>
    </React.Fragment>
  );
}

export default App;