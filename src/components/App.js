import React from "react";
import Header from "./navbar/Header";
import Main from './Main';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import About from '../components/about/About'
import Signin from "./users/SignIn";
import Signup from "./users/SignUp";
import ForgotPassword from './users/ForgotPassword';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './users/UpdateProfile';

function App(){
  return (
    <React.Fragment>
        <React.StrictMode>
          <Router>
            <AuthProvider>
            <Header />
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <Route path="/about" component={About}/>
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