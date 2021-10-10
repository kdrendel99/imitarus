import { useAuth } from '../contexts/AuthContext'
import React, {useState, useRef} from "react";
// import firebase from "firebase/app";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import accountart from '../../images/account_art.png';
import { Link, useHistory } from 'react-router-dom';


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

    // const showError = () => {
    //   return <div className="alert-danger">error</div>
    // }

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




    {/* {error && alert(error)}
    <div className="update_profile_bg">
    <div className="padding"/>
    <div className="padding"/>
    <div className="padding"/>
      <div className="container-fluid">
        <div className="row justify-content-center g-0">
          <div className="col-sm-6 col-xs-12">
            <h1 className="font-weight-bold py-3">Update Profile</h1>
            <h4>Join the community.</h4>
            <form onSubmit={handleSubmit}>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="email" placeholder="Email" name="email" className="form-control my-3 p-2" ref={emailRef} required defaultValue={currentUser.email}/>
                </div>
              </div>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" name="password" className="form-control my-3 p-2" ref={passwordRef} placeholder="leave blank to keep the same"/>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" name="passwordConfirmation" className="form-control my-3 p-2" ref={passwordConfirmRef} placeholder="leave blank to keep the same"/>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
									<button disabled={loading} className="login-btn my-2 p-1" type="submit">Sign Up</button>
                  </div>
                </div>
                <p>
                  <Link to="/">Cancel</Link>
                </p>
              </div>
            </form>
          </div>
					<div className="robot_art my-auto d-none d-sm-block col-sm-6">
						<img src={accountart} className="img-fluid"/>
					</div>
        </div>
      </div>
			</div> */}
    </React.Fragment>
  );
}

export default UpdateProfile

