import React, {useState, useRef} from "react";
import { useAuth } from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom';
import firebase from "firebase/app";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import david from '../../images/david2.jpeg';

const SignIn = (props) => {  
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const history = useHistory()

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

    // const showError = () => {
    //   return <div className="alert-danger">error</div>
    // }

  return (
    <React.Fragment>
      {error && alert(error)}
      {/* <div className="flex-background-signin"> */}
      <div className="padding"/>
      <div className="padding"/>
      <div className="padding"/>
        <div className="real_login_form">
          <div className="row-login text-center">
            <section className="col my-4 mx-5">
              <div className="row img g-0">
                <div className="col test"/>
                <div className="col px-5 pt-5">
                <div class="login-word">Login</div>
                  <div class="login-form-1">
                    <form onSubmit={handleSubmit} id="login-form">
                    <div class="login-form-main-message"></div>
                      <div class="main-login-form">
                        <div class="login-group">
                          <div class="form-group">
                            <label for="lg_username" class="sr-only">Username</label>
                            <input type="text" class="form-control" id="lg_username" name="lg_username" placeholder="username" ref={emailRef}/>
                          </div>
                          <div class="form-group">
                          <label for="lg_password" class="sr-only">Password</label>
                          <input type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password" ref={passwordRef}/>
                          </div>
                        </div>
                      <button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
                      </div>
                      <div class="etc-login-form"> 
                        <Link to="/forgot-password">
                          forgot your password?
                        </Link>

                        <Link to='/signup'>
                          Create an account
                        </Link>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* </div> */}
    </React.Fragment>
  );
}

export default SignIn