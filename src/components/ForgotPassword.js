import React, {useState, useRef} from "react";
import { useAuth } from './contexts/AuthContext'
import {Link} from 'react-router-dom';
import firebase from "firebase/app";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import accountart from '../images/account_art.png';

export default function ForgotPassword(){
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions.')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return(
  <React.Fragment>
  {error && alert(error)}
  {error && alert(message)}
  <div className="sign_up_bg">
  <div className="padding"/>
  <div className="padding"/>
  <div className="padding"/>
    <div className="container-fluid">
      <div className="row justify-content-center g-0">
        <div className="col-sm-6 col-xs-12">
          <h1 className="font-weight-bold py-3">Password reset</h1>
          <h4>Let's get this sorted out.</h4>
          <form onSubmit={handleSubmit}>
            {/* <div className="form-row">
              <div className="col-lg-7">
                <input type="name" placeholder="name" className="form-control my-3 p-2" ref={nameRef} required/>
              </div>
            </div> */}
            <div className="form-row">
              <div className="col-lg-7">
                <input type="email" placeholder="Email" name="email" className="form-control my-3 p-2" ref={emailRef} required/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-row">
                <div className="col-lg-7">
                <button disabled={loading} className="login-btn my-2 p-1" type="submit">Reset password</button>
                </div>
              </div>
              <p>Already have an account? 
                <Link to="/login">Log In</Link>
              </p>
              <p>Need an account? Create one 
                <Link to='/signup'>
                  here
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="robot_art my-auto d-none d-sm-block col-sm-6">
          <img src={accountart} className="img-fluid"/>
        </div>
      </div>
    </div>
    </div>
  </React.Fragment>
  );
}