import { useAuth } from '../contexts/AuthContext'
import React, {useState, useRef} from "react";
// import firebase from "firebase/app";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import accountart from '../../images/account_art.png';
import { Link, useHistory } from 'react-router-dom';
import './users.css'


const UpdateProfile = (props) => {  
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    const promises = [];
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value){
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push("/")
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <React.Fragment>
      <div className="real_login_form">
        <div className="container col1 d-flex align-items-center justify-content-center">
          <div className="row form1 w-100">
            {/* form */}
            <div className="col card">
              <div className="container-fluid formcontainer">
              <h1 className="font-weight-bold py-3">{currentUser.email}</h1>
              <h4>Update your account</h4>
              <form onSubmit={handleSubmit} id="login-form">
                <div className="form-row">
                  <div className="col">
                    <input type="email" placeholder="Email" className="form-control my-3 p-2" ref={emailRef}/>
                  </div>
                </div>
                <h5>Change password</h5>
                <div className="form-row">
                  <div className="col">
                    <input type="password" placeholder="******" className="form-control my-3 p-2" ref={passwordRef}/>
                  </div>
                  <div className="col">
                    <input type="password" placeholder="******" className="form-control my-3 p-2" ref={passwordConfirmRef}/>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <button type="submit" className="login-button">Submit</button>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col login-help mt-3 mb-5">
                      <Link to="/">
                        <p>Cancel</p>
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

export default UpdateProfile

