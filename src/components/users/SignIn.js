import React, {useState, useRef, useEffect} from "react";
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom';
import firebase from "firebase/app";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import david from '../../images/david2.jpeg';
import './users.css'

const SignIn = (props) => {  
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const {currentUser} = useAuth();

  async function handleSubmit(e){
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError('Failed to sign in')
    }

    setLoading(false)
  }

  return (
    <React.Fragment>
      {error && alert(error)}
      <div className="login-form">
        <div className="container col1 d-flex align-items-center justify-content-center">

          <div className="row form1 w-85">
            <div className="col g-0 d-none d-sm-block col-sm-6">
              <img src={david} className="img-fluid" alt=""/>
            </div>

            <div className="col card">

              <div className="container-fluid formcontainer">
              <h1 className="font-weight-bold py-3">Login</h1>
              <h4>Sign into your account</h4>
                <form onSubmit={handleSubmit} id="login-form">

                <div className="form-row">
                  <div className="col">
                    <input type="email" placeholder="Email" className="form-control my-3 p-2" ref={emailRef}/>
                  </div>
                </div>
                  <div className="form-row">
                    <div className="col">
                      <input type="password" placeholder="******" className="form-control my-3 p-2" ref={passwordRef}/>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <button type="submit" className="login-button">Login</button>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col login-help mt-3 mb-5">
                        <Link to="/forgot-password">
                          <p>Forgot your password?</p>
                        </Link>

                        <Link to='/signup'>
                          <p>Create an account</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn