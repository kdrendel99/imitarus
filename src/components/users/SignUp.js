import { useAuth } from '../contexts/AuthContext'
import React, {useState, useRef} from "react";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import accountart from '../../images/account_art.png';
import { Link, useHistory } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import './users.css'


const SignUp = (props) => {  
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const firestore = useFirestore();

  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value).then(registeredUser => {
        firestore.collection('users').add(
          {
            uid: registeredUser.user.uid,
            name: nameRef.current.value,
            avatar: 'gs://imitarus.appspot.com/default-profile-photo'
          }
        )
      })
      history.push("/")
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }


  return (
    <React.Fragment>
    {error && alert(error)}
    <section>
    <div className="sign_up_bg">
    <div className="padding"/>
    <div className="padding"/>
    <div className="padding"/>
      <div className="container-fluid">
        <div className="row justify-content-center g-0">
          <div className="col-sm-6 col-xs-12">
            <h1 className="font-weight-bold py-3">Create an account</h1>
            <h4>Join the community.</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="col-lg-7">
                  <input type="name" placeholder="name" className="form-control my-3 p-2" ref={nameRef} required/>
                </div>
              </div>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="email" placeholder="Email" name="email" className="form-control my-3 p-2" ref={emailRef} required/>
                </div>
              </div>
							<div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" name="password" className="form-control my-3 p-2" ref={passwordRef} required/>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input type="password" placeholder="******" name="passwordConfirmation" className="form-control my-3 p-2" ref={passwordConfirmRef} required/>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
									<button disabled={loading} className="login-btn my-2 p-1" type="submit">Sign Up</button>
                  </div>
                </div>
                <p>Already have an account? 
                  <Link to="/login" className="mx-2 text-decoration-none login-btn">Log In</Link>
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
      </section>
    </React.Fragment>
  );
}

export default SignUp