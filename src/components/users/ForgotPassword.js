import React, {useState, useRef} from "react";
import { useAuth } from '../contexts/AuthContext'
import {Link} from 'react-router-dom';
import firebase from "firebase/app";
import './users.css'

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
    <section className="d-flex align-items-center sign_up_bg">
      <div className="container align-items-center password-reset">
        <div className="row h-100">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 className="font-weight-bold py-3">Password reset</h1>
            <h4>Let's get this sorted out.</h4>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <input type="email" placeholder="Email" name="email" className="form-control p-2 w-75" ref={emailRef} required/>
              </div>
              <div className="my-3">
                <button disabled={loading} className="login-btn my-2 p-1" type="submit">Reset password</button>
              </div>
              <p>Already have an account? 
                <Link to="/login" className="mx-2 login-btn">Log In</Link>
              </p>
              <p>Need an account? 
                <Link to='/signup' className="mx-2 login-btn">
                  Create one here
                </Link>
              </p>
            </form>
          </div>
          <div className="col-lg-6 order-1 order-lg-1 d-flex justify-content-center account"/>
        </div>
      </div>
    </section>
  </React.Fragment>
  );
}