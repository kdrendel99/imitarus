import React from 'react';
// import '../App.css';
import Header from './Header';
import Main from './Main';
import Signin from "./SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Footer from './Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
