import { connect } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import * as c from './../actions/ActionTypes';
import PropTypes from "prop-types";
// import navAnimations from './navbar/navbar';
import './navbar/navbar.css';

function Header(props){
  const [error, setError] = useState('')
  const {currentUser, logout} = useAuth();
  const history = useHistory()
  const [dropdown, setDropdown] = React.useState(false);
  const [navbarAnimations, setAnimations] = React.useState(true);
  //prevent dropdown from initially changing to true
  const [dropdownInitial, setDropdownInitial] = React.useState(false)
  const [user, setUser] = useState(currentUser);

  const useFocus = () => {
    const dropdownRef = useRef(null)
    const setFocus = () => {dropdownRef.current && dropdownRef.current.focus()}
    
    return [ dropdownRef, setFocus ]
  }

  const [dropdownLoaded, setDropdownLoaded] = useFocus();


  // useEffect(() => {
  //   if(navbarAnimations){
  //     if (navbarAnimations){
  //       navAnimations();
  //     }
  //   }
  // })

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  const toggleDropdown = () => {
    let currentlyLoadedDropdown = `${dropdownLoaded.current.className}`;
    currentlyLoadedDropdown = '.' + currentlyLoadedDropdown.substring(11);
    const navbar = document.querySelector('#navbar');
    let dropdownIcon = document.querySelector('.mobile-nav-toggle')

      navbar.classList.toggle('navbar-mobile')
      dropdownIcon.classList.toggle('bi-list')
      dropdownIcon.classList.toggle('bi-x')
  }

  useEffect(() => {
    console.log('dropdown was changed')
    console.log(dropdown)
    //Only runs on the first load. Prevents initial load from toggling dropdown to true.
    if (!dropdownInitial){
      setDropdownInitial(true);
      return
    } 
    else if (dropdownInitial){
      toggleDropdown()
    }
  }, [dropdown])

  const resetSelected = () => {
    const { dispatch } = props;
    const action = {
      type: c.REMOVE_SELECTED_PROMPT
    }
    dispatch(action);
    // setDropdown(false);
  }

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push("/")
    } catch {
      setError('Failed to log out')
    }
  }

  
  return (
    {dropdown},
    <React.Fragment>
      <header id="header" className="fixed-top d-flex align-items-center justify-content-between">
        <div className="container-fluid g-4 d-flex justify-content-between">

        <h1 className="logo pt-1"><span onClick={() => resetSelected()}>IMITARUS</span></h1>
          {/* <h1 className="logo"><a href="index.html">Karlson Drendel</a></h1> */}
          <nav id="navbar" className="navbar" >
            <ul>
                <li>
                  <Link to="/" onClick={() => resetSelected()}>Home</Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => resetSelected()}>Register</Link>
                </li>

                {!currentUser?<li><Link to="/login" onClick={() => resetSelected()}>Log in</Link></li>:null}

                {currentUser?<li><Link to="/update-profile" onClick={() => resetSelected()}>PROF</Link></li>: null}

                {currentUser?<li><a onClick = {() => handleLogout()} className="login-btn" onClick={() => resetSelected()}>Log out</a></li>:null}

                {/* <li><a onClick = {() => resetSelected()} className="nav-link scrollto" href="#contact">Contact</a></li> */}
            </ul>
            <i className="bi bi-list mobile-nav-toggle" 
            ref={dropdownLoaded} onLoad={setDropdownLoaded} 
            onClick = {() => setDropdown(!dropdown)}></i>
          </nav>
        </div> 
      </header>  
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    selectedPrompt: state.selectedPrompt.selectedPrompt,
    showSignupForm: state.showSignupForm,
    showLoginForm: state.showLoginForm,
  }
}

Header = connect(mapStateToProps)(Header);

export default Header;