import { connect } from 'react-redux';
import React, { useEffect, useRef } from "react";
import * as c from './../actions/ActionTypes';
import PropTypes from "prop-types";
// import navAnimations from '../navbar/navbar';
// import './../navbar/navbar.css';

function Header(props){
  const [dropdown, setDropdown] = React.useState(false);
  const [navbarAnimations, setAnimations] = React.useState(true);
  const [navbarMobile, setNavbarMobile] = React.useState(dropdown)
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



  
  return (
    {dropdown},
    <React.Fragment>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">

          <h1 className="logo"><h1 className="text-light"><a href="index.html"><span>IMITARUS</span></a></h1></h1>
          {/* <nav id="navbar" className="navbar" >
            <ul>
                <li><a onClick = {() => resetSelected()} className="nav-link scrollto active" href="#hero">Home</a></li>
                <li><a onClick = {() => resetSelected()} className="nav-link scrollto" href="#about">About</a></li>
                <li><a onClick = {() => resetSelected()} className="nav-link scrollto" href="#portfolio">Portfolio</a></li>
                <li><a onClick = {() => resetSelected()} className="nav-link scrollto" href="#journal">Blog</a></li>
                <li><a onClick = {() => resetSelected()} className="nav-link scrollto" href="#contact">Contact</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" 
            ref={dropdownLoaded} onLoad={setDropdownLoaded} 
            onClick = {() => setDropdown(!dropdown)}></i>
          </nav> */}
        </div> 
      </header>  
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    selectedPrompt: state.selectedPrompt.selectedPrompt,
  }
}

Header = connect(mapStateToProps)(Header);

export default Header;