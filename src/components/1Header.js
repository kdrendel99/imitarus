import { connect } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import * as c from '../actions/ActionTypes';
import PropTypes from "prop-types";
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
// import navAnimations from '../navbar/navbar';
// import './../navbar/navbar.css';

function Header(props){
  const [dropdown, setDropdown] = React.useState(false);
  const [navbarAnimations, setAnimations] = React.useState(true);
  const [navbarMobile, setNavbarMobile] = React.useState(dropdown)
  const [error, setError] = useState('')
  const {currentUser, logout} = useAuth();
  const history = useHistory()


  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push("/")
    } catch {
      setError('Failed to log out')
    }
  }


  const toggleLoginForm = () => {
    const { dispatch } = props;
    const action = {
      type: c.TOGGLE_LOGIN_FORM
    }
    dispatch(action);
  }

  const toggleSignupForm = () => {
    const { dispatch } = props;
    const action = {
      type: c.TOGGLE_SIGNUP_FORM
    }
    dispatch(action);
  }

  //prevent dropdown from initially changing to true
  // const [dropdownInitial, setDropdownInitial] = React.useState(false)

  // const useFocus = () => {
  //   const dropdownRef = useRef(null)
  //   const setFocus = () => {dropdownRef.current && dropdownRef.current.focus()}
    
  //   return [ dropdownRef, setFocus ]
  // }

  // const [dropdownLoaded, setDropdownLoaded] = useFocus();


  // useEffect(() => {
  //   if(navbarAnimations){
  //     if (navbarAnimations){
  //       navAnimations();
  //     }
  //   }
  // })

  // const toggleDropdown = () => {
  //   let currentlyLoadedDropdown = `${dropdownLoaded.current.className}`;
  //   currentlyLoadedDropdown = '.' + currentlyLoadedDropdown.substring(11);
  //   const navbar = document.querySelector('#navbar');
  //   let dropdownIcon = document.querySelector('.mobile-nav-toggle')

  //     navbar.classList.toggle('navbar-mobile')
  //     dropdownIcon.classList.toggle('bi-list')
  //     dropdownIcon.classList.toggle('bi-x')
  // }

  // useEffect(() => {
  //   //Only runs on the first load. Prevents initial load from toggling dropdown to true.
  //   if (!dropdownInitial){
  //     setDropdownInitial(true);
  //     return
  //   } 
  //   else if (dropdownInitial){
  //     toggleDropdown()
  //   }
  // }, [dropdown])


  const resetSelected = () => {
    const { dispatch } = this.props;
    const action = {
      type: c.REMOVE_SELECTED_PROMPT
    }
    dispatch(action);
  }

  const handleClick = () => {
    this.toggleLoginForm();
    this.toggleSignupForm();
    this.clearPrompt();
  }

  const dispatchSelectedPrompt = (firestorePrompt) => {
    const { dispatch } = this.props;
    const action = {
      type: c.ADD_SELECTED_PROMPT,
      prompt: firestorePrompt
    }
    dispatch(action);
  }



  // .login-btn{
  //   background-color: transparent;
  //   display: inline-block!important;
    
  //   font-family: Athelas;
  //   color: #999999;
  //   border: none;
  // }
  // .login-btn:hover{
  //   color: #90b493;
  //   text-decoration: underline;
  //   transition: 1s;
  // }

  
  return (
    {dropdown},
    <React.Fragment>
      {error && alert(error)}
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">

          <h1 className="logo"><h1 className="text-light"><a href="/"><span onClick={() => handleClick()}>IMITARUS</span></a></h1></h1>
        </div> 

        
      <nav id="navbar" class="navbar">
        <ul>
          <li className="login-btn">Home</li>
          <li className="login-btn"><Link className="login-btn" to="/signup">register</Link></li>

          <li className="login-btn">{!currentUser?<Link className="login-btn" to="/signup">register</Link>:<Link to="/update-profile" className="login-btn">Update profile</Link>}</li>
          <li className="login-btn" onClick={() => {handleLogout()}}>Log out</li>
          {/* <li><a class="getstarted scrollto" href="#about">Get Started</a></li> */}
        </ul>
        {/* <i class="bi bi-list mobile-nav-toggle"></i> */}
      </nav>


        {/* {currentUser.email === null? null : currentUser.email} */}
        {/* <p> Email: {currentUser.email} </p> */}


        

        {/* <button className="login-btn" 
        onClick={() => toggleSignupForm()}
        >register</button>

        <button className="login-btn" 
        onClick={() => toggleLoginForm()}
        >sign in</button> */}
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